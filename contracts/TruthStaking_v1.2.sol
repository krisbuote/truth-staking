// Author: Kristopher Buote
// This contract enables people to stake Ether on a statment being true or false. 
// Winnings are distributed automatically as determined by majority stake at the end of staking round.
// ***** WORK IN PROGRESS *****

pragma solidity ^0.4.2;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/math/Math.sol';

contract TruthStaking {

	using SafeMath for uint;

	////////////////////// STRUCTS //////////////////////

	struct Statement {
		uint id;
		string statement;
		uint stakeDuration;
		uint stakeEndTime;
		address marketMaker;
		uint numStakes;
		uint value;
		bool stakeEnded;
		string source;
		mapping(uint => Stake) stakes; // TODO: Make private?
	}

	// Keep track of:
	// Addresses, how much was staked by each address,  and on which position (T or F)
	struct Stake {
		// consider probabilistic staking
		address addr; // Staker's address
		uint amount; // Value staked
		uint position; // Staker's position (1 true or 0 false) //////////TODO: remove position from here
	}

	// Create a pot that tracks Ether staked on True (T) vs. False (F)
	// Must keep sub-pots private, but totalPot value should be public
	struct Pot {
		uint total;
		uint T;
		uint F;
		//////////// TODO: Store stakes in here with position/amount . Private!
	}

	struct Beneficiary {
		address benAddr;
		uint potProportionTenThousandths;
	}


	////////////////////// MAPPINGS AND ARRAYS //////////////////////

	mapping(uint => Statement) public statements; //////////TODO: Make private and use events to get info?
	mapping(uint => Pot) private pots;  /////////// TODO: Put pot mapping in statement too?
	mapping(address => uint) public beneficiaryShares;

	address[] private beneficiaryAddresses;

	////////////////////// STATE VARIABLES //////////////////////

	// Information Trackers
	uint public absNumStatements;
	uint public absNumStakes;
	uint public absEthStaked;

	// Logistics
	uint pctTimeRemainingThreshold;

	uint minTimeAddPct;
	uint maxTimeAddPct;

	uint minPotPctThreshold;
	uint maxPotPctThreshold;

	address private owner;
	uint public serviceFeeTenThousandths; // This is a 4 digit int to accomodate precision of ten-thosaundths. eg. 1.25% is represented as 125

	////////////////////// EVENTS //////////////////////

    // Events that will be emitted on changes.
    event NewStake(uint statementID, uint amount);
    event StakeEnded(uint statementID, uint finalPot, uint winningPosition);
    event CurrentPot(uint statementID, uint potBalance);
   	event NewStatement(uint statementID, string statement, uint stakeEndTime);

   	// Events for debugging
   	event CorrectStake(uint statementID, address stakerAddr, uint amount, uint stakedPosition);
	event LoopCheck(uint loopNumber);
	event StatementIDCheck(uint statementID); /// CHECK
	event RewardCheck(uint rewardTransfered);
	event ProfitCheck(uint profitCalculated);
	event PotsCheck(uint TPotValue, uint FPotValue);


	// Constructor executes once when contract is created
	constructor () public {
		owner = msg.sender;
		pctTimeRemainingThreshold = 20;

		minTimeAddPct = 0;
		maxTimeAddPct = 40;

		minPotPctThreshold = 20;
		maxPotPctThreshold = 180;
	}

	////////////////////// MODIFIERS //////////////////////
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

	////////////////////// FUNCTIONS //////////////////////

	function newStatement(string _statement, uint _stakeDuration, string _source) public returns(uint statementID) {
		require(bytes(_statement).length > 0, "requires bytes(statement) > 0. Possibly empty string given.");

		uint stakeEndTime;

		stakeEndTime = now + _stakeDuration;
		statementID = absNumStatements++; //sets statementID and THEN increases absNumStatements by 1
		statements[statementID] = Statement(statementID, _statement, _stakeDuration, stakeEndTime, msg.sender, 0, 0, false, _source);
		pots[statementID] = Pot(0, 0, 0);

		emit NewStatement(statementID, _statement, stakeEndTime);
	}

	function stake(uint _statementID, uint _position) public payable { // returns( ) necessary? 

	    // Revert the call if the staking period is over or if insufficient value transacted
		require(msg.value > 0, "Insufficient stake value.");

		//// TODO: require(address exists)?

		require(_position == 0 || _position == 1, "Invalid position to stake on."); 
		require(_statementID < absNumStatements && _statementID >= 0, "Invalid Statement ID.");

		Statement storage s = statements[_statementID];
		require(now <= s.stakeEndTime, "Stake already ended for this statement.");

		// Map Stake with statement AND THEN add one to numStakes
		s.stakes[s.numStakes++] = Stake({addr:msg.sender, amount:msg.value, position:_position});

		// If it is near the end of the stake and someone stakes a large amount, time is added.
		uint pctTimeRemaining = 100 * (s.stakeEndTime - now) / (s.stakeEndTime - s.stakeDuration);
		uint percentOfCurrentPot = 100 * msg.value / s.value;

		if (pctTimeRemaining <= pctTimeRemainingThreshold && percentOfCurrentPot >= minPotPctThreshold) {

			// extraTime = stakeDuration * size of stake * time added per stake size ratio
			uint extraTime = s.stakeDuration * (percentOfCurrentPot - minPotPctThreshold) * (maxTimeAddPct - minTimeAddPct) / (maxPotPctThreshold - minPotPctThreshold) / 100;

			// Cap the amount of extra time added.
			extraTime = Math.min(extraTime, s.stakeDuration * maxPotPctThreshold / 100);

			// Add time to the stake
			s.stakeEndTime += extraTime;

		}

		// Update Statement value
		s.value += msg.value;

		// Add the stake to total pot
		emit NewStake(_statementID, msg.value);
		addToPot(msg.value, _position, _statementID);

		// Add to global trackers
		absNumStakes++;
		absEthStaked += msg.value;

	}

	function addToPot(uint _amount, uint _position, uint _statementID) private {

		Pot storage p = pots[_statementID];
		p.total += _amount;

		/// TODO: Consider using bool _position , not uint /// 
		if (_position == 1) {
			p.T += _amount;
		}
		else {
			p.F += _amount;
		}

		emit CurrentPot(_statementID, p.total);

	}

	function endStake(uint _statementID) public {

		// TODO: storage or memory???
		Statement storage s = statements[_statementID];

		// 1. Conditions
		// Require that sufficient time has passed and endStake has not already been called
		require(now >= s.stakeEndTime, "There is still staking time remaining.");
		require(!s.stakeEnded, "endStake has already been called.");

		// 2. Effects
		s.stakeEnded = true;  //////// TODO: HAS NO EFFECT (update: switched to storage, works now?)

		// 3. Interactions
		// distribute pot between winners, proportional to their stake
		distribute(_statementID);
	}

	// TODO: Consider a withdraw function rather than automated distribution

	function distribute(uint _statementID) private {

		uint profit; // CHECK math and rounding here
		uint reward; 
		uint winningPot;
		uint losingPot;
		uint winningPosition;

		// TODO storage or memory?
		Statement storage s = statements[_statementID];
		Pot storage p = pots[_statementID];
		emit CurrentPot(_statementID, p.total);


		if (p.T >= p.F) {
			winningPot = p.T;
			losingPot = p.F;
			winningPosition = 1;
		}
		else {
			winningPot = p.F;
			losingPot = p.T;
			winningPosition = 0;
		}


		// Platform Service Fee
		uint fee = losingPot * serviceFeeTenThousandths / 10000;
		uint potRemaining = losingPot - fee;

		// Emit the total pot value and winning position at end of stake
		emit StakeEnded(_statementID, winningPot + losingPot, winningPosition);
		
		// Beneficiaries 
		for (uint i = 0; i < beneficiaryAddresses.length; i++) {
			address beneficiary = beneficiaryAddresses[i];
			beneficiary.transfer(losingPot * beneficiaryShares[beneficiary] / 10000);
			potRemaining -= losingPot * beneficiaryShares[beneficiary] / 10000;
		}

		// Stakers Rewards

		for (uint j = 0; j < s.numStakes; j++) {

			// emit LoopCheck(j);

			// If the staker's position matched the majority
			// They receive their original stake + proportion of loser's stakes
			if (s.stakes[j].position == winningPosition) {

				// Calculate profit for correct staker
				profit = s.stakes[j].amount * potRemaining / winningPot;
				emit ProfitCheck(profit);

				// Their reward is original stake + profit
				reward = s.stakes[j].amount + profit;
				emit RewardCheck(reward);

				// Send the winner their reward
				s.stakes[j].addr.transfer(reward);

			}

		}

		owner.transfer(fee);

	}

	// function addTimeToStake(uint _statementID, uint _percentOfCurrentPot) {
	// 	require(percentOfCurrentPot >= minPotPctThreshold, 'Stake is not sufficiently large to add time.')

	// 	extraTime = stakeTime * (_percentOfCurrentPot - minPotPctThreshold) * timeSlopeRise / timeSlopeRun

	// }

	function setServiceFeeTenThousandths(uint _newServiceFeeTenThousandths) public onlyOwner {
		// _newServiceFeeTenThousandths should be desired fee percentage * 100.
		// e.g. if service fee of 1.75% is desired, _newServiceFeeTenThousandths = 175
		require(_newServiceFeeTenThousandths >= 0, 'Service Fee cannot be less than 0%.');
		require(_newServiceFeeTenThousandths <= 10000, 'Service Fee cannot be greater than 100%.');
		serviceFeeTenThousandths = _newServiceFeeTenThousandths;
	}

	function addBeneficiaryCutTenThousandths(address _beneficiaryAddress, uint _potProportionTenThousandths) public onlyOwner {
		// _potProportionTenThousandths should be desired percentage * 100.
		// e.g. if a pot cut of 0.35% is desired, _potProportionTenThousandths = 35
		require(_potProportionTenThousandths >= 0, 'Beneficiary cut cannot be less than 0%.');
		require(_potProportionTenThousandths <= 10000, 'Beneficiary cut cannot be greater than 100%.');
		beneficiaryAddresses.push(_beneficiaryAddress);
		beneficiaryShares[_beneficiaryAddress] = _potProportionTenThousandths;

		// TODO: Test you can set address cut back to zero
	}

	function transferOwnership(address _newOwner) public onlyOwner {
		owner = _newOwner;
	}


}
