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

App = {
	web3Provider: null,
	contracts: {},
  	truthStakingContract: null,
  	allStatementsArray: [],
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
      			$("#absEthStaked").html((absEthStaked.toNumber()/10**18).toFixed(3));
			}
		   else {
		        console.error(error);
			}
		});


	    // New Statement Position select menu
	    var newStatmentPositionSelect = $("#newStatementPosition");
	    newStatmentPositionSelect.empty();
	    var chooseTrue = "<option value='1'> True </ option>"
	    var chooseFalse = "<option value='0'> False </ option>"
	    newStatmentPositionSelect.append(chooseTrue);
	    newStatmentPositionSelect.append(chooseFalse);


		var start = new Date().getTime();

		// Build data table out of past statements
		contractInstance.absNumStatements(function(error, _numStatements){ 

			if(!error) {
				var numStatements = _numStatements.toNumber();

				App.allStatementsArray = [];
				console.log(numStatements);

				for (var i = 0; i < numStatements; i++) {

					App.getStatementDataAndBuildPastTable(i, numStatements, contractInstance);

				}

			}

			else {
				console.error(error)
			}

		});


		loader.hide();
      	content.show();
	
	},

	

	getStatementDataAndBuildPastTable: function(_index, _numStatements, _contractInstance) {
		// Queries blockchain for statement data
		_contractInstance.statements(_index, function(error, statement) {

			if(!error){
				
				App.allStatementsArray.push(statement); // Push to array

				if (App.allStatementsArray.length == _numStatements) {
					App.displayPastDataTable(); // If all statements collected, build data table
				}
			}

			else{console.error(error)}

		});


	},

	displayPastDataTable: function() {

		var pastStatementsData = [];

		for (var i = 0; i < App.allStatementsArray.length; i++) {

			var statement = App.allStatementsArray[i];

		  	var statementID = statement[0];
			var statementText = statement[1];
			var stakeDuration = statement[2];
			var stakeEndTime = statement[3];
			var marketMaker = statement[4];
		 	var numStakes = statement[5];
			var ethStaked = (statement[6] / 10**18).toFixed(3);
			var stakeEnded = statement[7];
			var statementSource = statement[8];


			var cardHtml = App.collapsingCardHTMLformatPastData(statementID, statementText, ethStaked, statementSource, stakeEndTime);
			var ethStakedHtml = `<p class="display-4 text-center">${ethStaked}</p>`

			if (stakeEnded) {
				pastStatementsData.push([ethStakedHtml, cardHtml]);
			}

		}

		console.log(pastStatementsData);

		$('#pastStatementTable').DataTable( {
	        data: pastStatementsData,
	        columns: [
	            { title: "Sort by Value" },
	            { title: "Sort by Recency"}  //TODO: Need to change html in collapsingCardHTMLformat() to data-order by recency
	        ],
	        "order": [[ 0, "desc" ]]
	    });
	},

	collapsingCardHTMLformatPastData: function(statementID, statementText, ethStaked, statementSource, stakeEndTime, verdict) {
		var html = `<div class="card bg-transparent mb-3" id="card${statementID}">
		                <div class="card-header bg-transparent text-center" id="cardHeading${statementID}" data-toggle="collapse" data-target="#cardBodyCollapse${statementID}" aria-expanded="false" aria-controls="collapse${statementID}">
		                    <button class="btn btn-default" >
		                    	<abbr class="lead">${ethStaked} eth</abbr>
		                      	<p class="font-weight-light">${statementText}</p>
		                      	<p class="font-weight-light">Verdict: ${verdict}</p>
		                    </button>
		                </div>



		                <div class="card-body collapse" id="cardBodyCollapse${statementID}" aria-labelledby="heading${statementID}" data-parent="#liveStatementsAccordionTable">

			                <div class="card-body text-center">
			                  
			                    <div class="statement-source text-center">
			                    	<small class="text-muted">source: <a href="https://www.google.com/search?q=${statementSource}" target="_blank"> ${statementSource}</a></small>
			                    </div>

			                    <div>
			                    	<button type="button" class="btn btn-link btn-lg mt-0 float-right">
									  <a href="./about.html" class="fas fa-info-circle"></a>
									</button>
								</div>


			                </div>


		                </div>
		            </div>`

		return html
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

	makeStake: function(_statementID, _stakePosition, _stakeValue) {
	    // var statementIdToStake = $("#statementIdToStake").val()
	    var statementIdToStake = _statementID;
	    console.log('sid', statementIdToStake);
	    var stakePosition = _stakePosition.value;
	    console.log('stake pos', stakePosition);

	    // positionTrue = $("#trueButton" + statementIdToStake.toString()).val();
	    // positionFalse = $("#falseButton" + statementIdToStake.toString()).val();
	    // console.log('true val:', positionTrue);
	    // console.log('false val:', positionFalse)
	    // var position = $("#positionSelect").val();
	    // var stakeValue = $("#stakeValue").val();

	    var stakeValue = _stakeValue.value;
	    console.log('stakeValue: ', stakeValue)
	    // console.log(statementIdToStake, stakePosition, stakeValue);


	    if (!stakeValue) {
			alert("Please set the stake amount.");
	    }
	    console.log(App.account);
	    if (!App.account) {
	    	alert("Please sign into MetaMask and refresh.");
	    }

	    else {
			var txObject = {
				from: App.account, 
				value:stakeValue*10**18 
			}

			var contractInstance = App.truthStakingContract.at(contractAddress);
		    contractInstance.stake.sendTransaction(statementIdToStake, stakePosition, txObject, function(error, result) {
		    	if(!error) {
		    		console.log(result);
		    		alert("Successful stake! It will take some time to appear on the blockchain.");

		    	}

		    	else {

		    		alert("Transaction failed. Please check if the staking period is over.")
		    		console.error(error);

		    		// TODO: Include transaction error explanations: stake over, not enough ether sent, invalid statementId, invalid stakePosition
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

// // Keep card stake collapse open
// $('.card').click(function(e) {
//   if (
//     $(this)
//       .find('.collapse')
//       .hasClass('show')
//   ) {
//     e.stopPropagation();
//   }
// });



$(function() {
  $(window).on("load", function() {
    App.init();
  });
});

// $(document).ready(function() {
// 	console.log(allStatementsArray);
//     $('#statementTable').DataTable( {
// 	        data: allStatementsArray,
// 	        columns: [
// 	            { title: "eth" },
// 	            { title: "statement" },
// 	            { title: "time remaining"}

// 	        ]
// 	    });

// });
