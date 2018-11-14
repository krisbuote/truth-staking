const Web3 = require('web3')
// const web3 = new Web3('https://ropsten.infura.io/v3/42aaa48771054803a55bc1ad26f70a47')
console.log(web3.version);

const contractAddress = '0xe30c76fed6e88dd46889406eb3e5eb623e05361d' // from etherscan

// From remix, or import from JSON build file (better choice)
const contractABI = [{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_stakingTime","type":"uint256"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"stakeEnded","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"finalPot","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"potBalance","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"position","type":"uint256"}],"name":"MajorityStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"}],"name":"NewStatement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"stakedPosition","type":"uint256"}],"name":"CorrectStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loopNumber","type":"uint256"}],"name":"LoopCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"}],"name":"StatementIDCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewardTransfered","type":"uint256"}],"name":"RewardCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"profitCalculated","type":"uint256"}],"name":"ProfitCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TPotValue","type":"uint256"},{"indexed":false,"name":"FPotValue","type":"uint256"}],"name":"PotsCheck","type":"event"}] // from Remix web3deploy first line
// var truthstakeContract = new web3.eth.Contract(contractABI, contractAddress);


App = {
	web3Provider: null,
  	truthStakeContract: null,
  	account: '0x0',

	init: function() {
		return App.initWeb3();
	},

	initWeb3: function() {
		console.log('initWeb3');

	    // TODO: refactor conditional
	    if (typeof web3 !== 'undefined') {
	      // If a web3 instance is already provided by Meta Mask.
	      App.web3Provider = web3.currentProvider;
	      web3 = new Web3(web3.currentProvider);
	    } else {
	      // Specify default instance if no web3 instance provided
	      App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/42aaa48771054803a55bc1ad26f70a47');
	      web3 = new Web3(App.web3Provider);
	    }
	    return App.initContract();
	},	

	initContract: function() {
		console.log('initContract');

		// App.truthStakeContract = new web3.eth.Contract(contractABI, contractAddress);
		// App.truthStakeContract = web3.eth.contract(contractABI, contractAddress);
		App.truthStakeContract = web3.eth.contract(contractABI);


		console.log(App.truthStakeContract);
		console.log(App.contractInstance);
		return App.render();
	},

	render: function() {
		console.log("render")

		var loader = $("#loader");
	    var content = $("#content");

	    loader.show();
	    content.hide();

	    // Load account data
	    web3.eth.getCoinbase(function(err, account) {
	      if (err === null) {
	        App.account = account;
	        $("#accountAddress").html("Your Account: " + account);
	      }
	    });

	    // Instantiate contract instance
		var contractInstance = App.truthStakeContract.at(contractAddress);

		// Display the total Ether staked so far
		contractInstance.absEthStaked(function(error, absEthStaked) {
		   if(!error) {
		   		console.log('absEth', absEthStaked);
      			$("#absEthStaked").html(absEthStaked.toNumber()/10**18);
			}
		   else {
		        console.error(error);
			}
		});


		//// Build the Statement display table

		 // Position select menu
	    var positionSelect = $("#positionSelect");
	    positionSelect.empty();
	    var chooseTrue = "<option value='1'> True </ option>"
	    var chooseFalse = "<option value='0'> False </ option>"
	    positionSelect.append(chooseTrue);
	    positionSelect.append(chooseFalse);


		contractInstance.absNumStatements(function(error, numStatements){

		    if(!error) {
		        console.log('numStatements:', numStatements);


		        var statementInfo = $("#statementInfo");
				statementInfo.empty();

				// table builder 
				for (var i = 0; i < numStatements; i++) {

				/////////////  BUG IN HERE /////////////////// 
				///// Erasing table after stake made./////

				contractInstance.statements(i, function(error, statement) {
				  var statementID = statement[0];
				  var text = statement[1];
				  var stakeEndTime = statement[2];
				  var marketMaker = statement[3];
				  var numStakes = statement[4];
				  // var amountStaked = statement[5];
				  var stakeEnded = statement[5];
				  var stakedEth;

				  // for (var j = 0; j <= numStakes; j++) {
				  //   var stake = statement.stakes(j)
				  //   stakedEth += stake[1]
				  // }

				  var statementTemplate = "<tr><td>" + statementID + "</td><td>" + numStakes + "</td><td>" + text + "</td><td>" + stakeEnded + "</td></tr>"
				  statementInfo.append(statementTemplate);
				});

				/////////////// BUG END //////////////////

				}
		    }

		    else {
		        console.error(error);
		    }
		});

		loader.hide();
      	content.show();


	
	},

	makeNewStatement: function() {
		var newStatementString = $("#newStatementString").val();
		var newStatementStakingPeriod = $("#newStatementStakingPeriod").val();

		var txObject = {
			from: App.account
		}

		var contractInstance = App.truthStakeContract.at(contractAddress);
		contractInstance.newStatement(newStatementString, newStatementStakingPeriod, txObject, function(err, result) {
			if(!err) {
				console.log("makeNewStatement success! new statementID: ", result)
			}
			else {
				console.error(err)
			}
		});

		// App.contracts.TruthStakeMultiple.deployed().then(function(instance) {
		//   TruthStakeMultipleInstance = instance;
		//   return TruthStakeMultipleInstance.newStatement(newStatementString, newStatementStakingPeriod);

		// }).then(function(result) {
		//   newStatementID = result;
		//   content.hide();
		//   loader.show();

		// }).catch(function(err) {
		//   console.error(err);
		// });

	},

	makeStake: function() {
	    var statementIdToStake = $("#statementIdToStake").val()
	    var position = $("#positionSelect").val();
	    var stakeValue = $("#stakeValue").val();
	    console.log(statementIdToStake, position, stakeValue);



		var contractInstance = App.truthStakeContract.at(contractAddress);

		var txObject = {
			from: App.account, 
			value:stakeValue*10**18 
		}

	    contractInstance.stake.sendTransaction(statementIdToStake, position, txObject, function(error, result) {
	    	if(!error) {
	    		console.log(result);
	    	}

	    	else {

	    		alert("Transaction failed. Please check if the staking period is over.")
	    		console.error(error);

	    		// TODO: Include transaction error explanations: stake over, not enough ether sent, invalid statementId, invalid position
	    	}

	    });
	    
    }



}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
