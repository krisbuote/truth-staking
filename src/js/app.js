const Web3 = require('web3')
// const web3 = new Web3('https://ropsten.infura.io/v3/42aaa48771054803a55bc1ad26f70a47')

// const contractAddress = '0xe30c76fed6e88dd46889406eb3e5eb623e05361d' // from etherscan
// // From remix, or import from JSON build file (better choice)
// const contractABI = [{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_stakingTime","type":"uint256"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"stakeEnded","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"finalPot","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"potBalance","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"position","type":"uint256"}],"name":"MajorityStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"}],"name":"NewStatement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"stakedPosition","type":"uint256"}],"name":"CorrectStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loopNumber","type":"uint256"}],"name":"LoopCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"}],"name":"StatementIDCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewardTransfered","type":"uint256"}],"name":"RewardCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"profitCalculated","type":"uint256"}],"name":"ProfitCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TPotValue","type":"uint256"},{"indexed":false,"name":"FPotValue","type":"uint256"}],"name":"PotsCheck","type":"event"}] // from Remix web3deploy first line
// // var truthStakingContract = new web3.eth.Contract(contractABI, contractAddress);

const contractAddress = '0x4D348a7A1c237Fa3Cad122d28746972b3Aa0503F'
const contractABI = [{"constant":false,"inputs":[{"name":"_newServiceFeeTenThousandths","type":"uint256"}],"name":"setServiceFeeTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"serviceFeeTenThousandths","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiaryAddress","type":"address"},{"name":"_potProportionTenThousandths","type":"uint256"}],"name":"setBeneficiaryCutTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeDuration","type":"uint256"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"value","type":"uint256"},{"name":"stakeEnded","type":"bool"},{"name":"source","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"beneficiaryShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_position","type":"uint256"},{"name":"_stakeDuration","type":"uint256"},{"name":"_source","type":"string"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"finalPot","type":"uint256"},{"indexed":false,"name":"winningPosition","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"potBalance","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"},{"indexed":false,"name":"source","type":"string"}],"name":"NewStatement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"stakedPosition","type":"uint256"}],"name":"CorrectStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loopNumber","type":"uint256"}],"name":"LoopCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"}],"name":"StatementIDCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewardTransfered","type":"uint256"}],"name":"RewardCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"profitCalculated","type":"uint256"}],"name":"ProfitCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TPotValue","type":"uint256"},{"indexed":false,"name":"FPotValue","type":"uint256"}],"name":"PotsCheck","type":"event"}]

var statementDict = new Object();
var statementMap = new Map();
var statementArray = new Array();

App = {
	web3Provider: null,
	contracts: {},
  	truthStakingContract: null,
  	statementArray: [],
  	account: '0x0',

	init: function() {
		return App.initWeb3();
	},

	initWeb3: function() {

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

		App.truthStakingContract = web3.eth.contract(contractABI);
		App.listenForEvents();

		return App.render();
	},


	listenForEvents: function() {
		
		var contractInstance = App.truthStakingContract.at(contractAddress);

		var newStakeEvent = contractInstance.NewStake();
		newStakeEvent.watch(function(error, result) {
			if (!error) {
				// Do something
				console.log(result);
				console.log(" stakeEvent 1 success");
				var statementID = result.args.statementID;
			}
			else {
				console.error(err);
			}
		});


		var newStatementEvent = contractInstance.NewStatement();
		newStatementEvent.watch(function(error, result) {
			if (!error) {
				// Do something
				var statementID = result.args.statementID;
				var statementText = result.args.statement;
				console.log("newStatementEvent WORKED! statementID: ", statementID);
			}
			else {
				console.error(err);
			}
		});


		// Or pass a callback to start watching immediately
		var events = contractInstance.allEvents(function(error, log){

			if (!error)
		 		console.log("allEvents success")
		    	console.log(log);
		});
	},



	render: function() {

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
		var contractInstance = App.truthStakingContract.at(contractAddress);

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



		 // Stake Position select menu
	    var positionSelect = $("#positionSelect");
	    positionSelect.empty();
	    var chooseTrue = "<option value='1'> True </ option>"
	    var chooseFalse = "<option value='0'> False </ option>"
	    positionSelect.append(chooseTrue);
	    positionSelect.append(chooseFalse);


	    // New Statement Position select menu
	    var newStatmentPositionSelect = $("#newStatementPosition");
	    newStatmentPositionSelect.empty();
	    var chooseTrue = "<option value='1'> True </ option>"
	    var chooseFalse = "<option value='0'> False </ option>"
	    newStatmentPositionSelect.append(chooseTrue);
	    newStatmentPositionSelect.append(chooseFalse);


		// Build the Statement display table
		contractInstance.absNumStatements(function(error, numStatements){

		    if(!error) {
		        console.log('numStatements:', numStatements);


		        var statementInfo = $("#statementInfo");
				statementInfo.empty();

				// table builder 
				for (var i = 0; i < numStatements; i++) {

				contractInstance.statements(i, function(error, statement) {
				  var statementID = statement[0];
				  var text = statement[1];
				  var stakeEndTime = statement[2];
				  var marketMaker = statement[3];
				  var numStakes = statement[4];
				  var stakeEnded = statement[5];
				  var stakedEth;

				  var statementTemplate = `<tr><td> ${statementID} </td><td> ${numStakes} </td><td> ${text} </td><td> ${stakeEnded} </td></tr>`

				  statementInfo.append(statementTemplate);
				});


				}
		    }

		    else {
		        console.error(error);
		    }
		});


		// Build collapsible accordion to display statements and eth staked on face, click to show more data.
		var start = new Date().getTime();

		contractInstance.absNumStatements(function(error, numStatements){ 

			if(!error) {

				var statementAccordionData = $('#accordionStatementData');
				statementAccordionData.empty();

				// Looped accordion builder
				for (var i = 0; i < numStatements; i++) {


					contractInstance.statements(i, function(error, statement) {
				  	var statementID = statement[0];
					var statementText = statement[1];
					var stakeDuration = statement[2];
					var stakeEndTime = statement[3];
					var marketMaker = statement[4];
				 	var numStakes = statement[5];
					var ethStaked = statement[6] / 10**18;
					var stakeEnded = statement[7];
					var statementSource = statement[8];


					var statementAccordionTemplate =`<div class="card">
										                <div class="card-header" id="cardHeading${statementID}">
										                  <h5 class="mb-0">
										                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${statementID}" aria-expanded="false" aria-controls="collapse${statementID}">
										                      ${ethStaked} ether on "${statementText}"
										                    </button>
										                  </h5>
										                </div>

										                <div id="collapse${statementID}" class="card-body collapse" aria-labelledby="heading${statementID}" data-parent="#accordion">
										                  <div class="card-body">
										                    Put data form in here (with Netlify?). Info can be shown: <br/>
										                    statement source: ${statementSource} <br/>
										                    status: [in future: put green 'Active', yellow 'Ending soon!', red/orange 'Finished'] <br/>
										                    stake end time: ${stakeEndTime}

										                  </div>
										                </div>
										            </div>`

					statementAccordionData.append(statementAccordionTemplate);




					// var thisStatement = new App.statementData(statement[0].toNumber(), statement[1].toString());
	
					// App.statementArray.push(statement);
					// console.log(App.statementArray);


				});

						    /// TODO: PUT NETLIFY FORM IN CARD BODY.
				}

			var end = new Date().getTime();
			var elapsed = end - start;
			console.log("Statement Data Load Time: " + elapsed);
			// For 10 statements: 140-240 ms.

			}

			else {
		        console.error(error);
		    }

		});


		// console.log(statementDict);

		loader.hide();
      	content.show();

	
	},

	statementData: function(_statementID, _statementText) {
		this.statementID = _statementID;
		this.statementText = _statementText;
	},

	makeNewStatement: function() {
		var newStatementString = $("#newStatementString").val();
		var newStatementPosition = $("#newStatementPosition").val();
		var newStatementStakingPeriod = $("#newStatementStakingPeriod").val();
		var newStatementSource = $("#newStatementSource").val();
		var newStatementStakeValue = $("#newStatementStakeValue").val();

		console.log(newStatementString);

		if (!newStatementString || !newStatementPosition || !newStatementStakingPeriod || !newStatementSource || !newStatementStakeValue){	
			console.log("Please complete the form.");
			alert("You must complete the form first.");
		}

		else {

			var txObject = {
				from: App.account,
				value: newStatementStakeValue*10**18
			}

			var contractInstance = App.truthStakingContract.at(contractAddress);
			contractInstance.newStatement(newStatementString, newStatementPosition, newStatementStakingPeriod, newStatementSource, txObject, function(err, result) {
				if(!err) {
					alert("Success! It will take some time to appear on the blockchain.");
					console.log("makeNewStatement success! new statementID: ", result);
				}
				else {
					console.error(err);
				}
			});

		}

	},

	makeStake: function() {
	    var statementIdToStake = $("#statementIdToStake").val()
	    var position = $("#positionSelect").val();
	    var stakeValue = $("#stakeValue").val();
	    console.log(statementIdToStake, position, stakeValue);

	    if (!statementIdToStake || !position || !stakeValue) {
			console.log("Please complete the form.");
			alert("You must complete the form first.");
	    }

	    else {
			var txObject = {
				from: App.account, 
				value:stakeValue*10**18 
			}

			var contractInstance = App.truthStakingContract.at(contractAddress);
		    contractInstance.stake.sendTransaction(statementIdToStake, position, txObject, function(error, result) {
		    	if(!error) {
		    		console.log(result);
		    		alert("Successful stake! It will take some time to appear on the blockchain.");

		    	}

		    	else {

		    		alert("Transaction failed. Please check if the staking period is over.")
		    		console.error(error);

		    		// TODO: Include transaction error explanations: stake over, not enough ether sent, invalid statementId, invalid position
		    	}

		    });

	    }

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
