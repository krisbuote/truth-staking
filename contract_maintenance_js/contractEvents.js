const Web3 = require('web3')
// web3Provider = Web3.providers.HttpProvider('https://ropsten.infura.io/v3/42aaa48771054803a55bc1ad26f70a47');


// TODO: refactor conditional
if (typeof web3 !== 'undefined') {
  // If a web3 instance is already provided by Meta Mask.
  var web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // Specify default instance if no web3 instance provided
  var web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/42aaa48771054803a55bc1ad26f70a47');
  web3 = new Web3(web3Provider);
}
const contractAddress = '0x4D348a7A1c237Fa3Cad122d28746972b3Aa0503F'
const contractABI = [{"constant":false,"inputs":[{"name":"_newServiceFeeTenThousandths","type":"uint256"}],"name":"setServiceFeeTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"serviceFeeTenThousandths","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiaryAddress","type":"address"},{"name":"_potProportionTenThousandths","type":"uint256"}],"name":"setBeneficiaryCutTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeDuration","type":"uint256"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"value","type":"uint256"},{"name":"stakeEnded","type":"bool"},{"name":"source","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"beneficiaryShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_position","type":"uint256"},{"name":"_stakeDuration","type":"uint256"},{"name":"_source","type":"string"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"finalPot","type":"uint256"},{"indexed":false,"name":"winningPosition","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"potBalance","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"},{"indexed":false,"name":"source","type":"string"}],"name":"NewStatement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"stakedPosition","type":"uint256"}],"name":"CorrectStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loopNumber","type":"uint256"}],"name":"LoopCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"}],"name":"StatementIDCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewardTransfered","type":"uint256"}],"name":"RewardCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"profitCalculated","type":"uint256"}],"name":"ProfitCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TPotValue","type":"uint256"},{"indexed":false,"name":"FPotValue","type":"uint256"}],"name":"PotsCheck","type":"event"}]



var truthStakingContract = web3.eth.contract(contractABI);
var contractInstance = truthStakingContract.at(contractAddress);

// Store all statement data in dictionary
var statementDict = new Object();

// Or pass a callback to start watching immediately
var events = contractInstance.allEvents(function(error, log){
 if (!error)
   console.log("contractEvents.js: ", log);
});
// // Build collapsible accordion to display statements and eth staked on face, click to show more data.
// contractInstance.absNumStatements(function(error, numStatements){ 

// 	if(!error) {


// 		// Looped accordion builder
// 		for (var i = 0; i < numStatements; i++) {


// 			contractInstance.statements(i, function(error, statement) {
// 		  	var statementID = statement[0];
// 			var statementText = statement[1];
// 			var stakeDuration = statement[2];
// 			var stakeEndTime = statement[3];
// 			var marketMaker = statement[4];
// 		 	var numStakes = statement[5];
// 			var amountStaked = statement[6] / 10**18;
// 			var stakeEnded = statement[7];
// 			var statementSource = statement[8];

// 			statementData = {"statementID": statement[0],
// 							 "statementText": statement[1],
// 							 "stakeDuration": statement[2],
// 							 "stakeEndTime": statement[3],
// 							 "marketMaker": statement[4],
// 						 	 "numStakes": statement[5],
// 							 "ethStaked": statement[6] / 10**18,
// 							 "stakeEnded": statement[7],
// 							 "statementSource": statement[8]
// 							}

// 			statementDict[i] = statementData;

// 		});

// 				    /// TODO: PUT NETLIFY FORM IN CARD BODY.
// 		}
// 	}

// 	else {
//         console.error(error);
//     }

// });


console.log(statmentDict);