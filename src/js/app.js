const Web3 = require('web3')
// const web3 = new Web3('https://ropsten.infura.io/v3/42aaa48771054803a55bc1ad26f70a47')

// const contractAddress = '0xe30c76fed6e88dd46889406eb3e5eb623e05361d' // from etherscan
// // From remix, or import from JSON build file (better choice)
// const contractABI = [{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_stakingTime","type":"uint256"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"stakeEnded","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"finalPot","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"potBalance","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"position","type":"uint256"}],"name":"MajorityStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"}],"name":"NewStatement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"stakedPosition","type":"uint256"}],"name":"CorrectStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loopNumber","type":"uint256"}],"name":"LoopCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"}],"name":"StatementIDCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewardTransfered","type":"uint256"}],"name":"RewardCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"profitCalculated","type":"uint256"}],"name":"ProfitCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TPotValue","type":"uint256"},{"indexed":false,"name":"FPotValue","type":"uint256"}],"name":"PotsCheck","type":"event"}] // from Remix web3deploy first line
// // var truthStakingContract = new web3.eth.Contract(contractABI, contractAddress);

const contractAddress = '0x4D348a7A1c237Fa3Cad122d28746972b3Aa0503F'
const contractABI = [{"constant":false,"inputs":[{"name":"_newServiceFeeTenThousandths","type":"uint256"}],"name":"setServiceFeeTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"serviceFeeTenThousandths","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiaryAddress","type":"address"},{"name":"_potProportionTenThousandths","type":"uint256"}],"name":"setBeneficiaryCutTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeDuration","type":"uint256"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"value","type":"uint256"},{"name":"stakeEnded","type":"bool"},{"name":"source","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"beneficiaryShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_position","type":"uint256"},{"name":"_stakeDuration","type":"uint256"},{"name":"_source","type":"string"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"finalPot","type":"uint256"},{"indexed":false,"name":"winningPosition","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"potBalance","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"},{"indexed":false,"name":"source","type":"string"}],"name":"NewStatement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"stakerAddr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"stakedPosition","type":"uint256"}],"name":"CorrectStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loopNumber","type":"uint256"}],"name":"LoopCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"}],"name":"StatementIDCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewardTransfered","type":"uint256"}],"name":"RewardCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"profitCalculated","type":"uint256"}],"name":"ProfitCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TPotValue","type":"uint256"},{"indexed":false,"name":"FPotValue","type":"uint256"}],"name":"PotsCheck","type":"event"}]


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
	    var blockchainContent = $("#blockchain-content");

	    loader.show();
	    blockchainContent.hide();

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
      			$("#absEthStaked").html((absEthStaked.toNumber()/10**18).toFixed(1));
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


		// Build collapsible accordion to display statements and eth staked on face, click to show more data.
		var start = new Date().getTime();

		// Build popular stakes out of live statements
		contractInstance.absNumStatements(function(error, _numStatements){ 


			if(!error) {
				var numStatements = _numStatements.toNumber();
				$("#absNumStatements").html(numStatements);


				App.allStatementsArray = [];
				console.log("numStatements:",numStatements);

				for (var i = 0; i < numStatements; i++) {

					App.getStatementDataAndDisplayPopularStakes(i, numStatements, contractInstance);

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
	
	},


	getStatementDataAndBuildLiveTable: function(_index, _numStatements, _contractInstance) {
		// Queries blockchain for statement data

		_contractInstance.statements(_index, function(error, statement) {

			if(!error){	

				
				App.allStatementsArray.push(statement); // Push full statement array to array

				if (App.allStatementsArray.length == _numStatements) {
					App.displayLiveDataTable(); // If all statements collected, build data table
					// App.displayPastDataTable();
				}
			}

			else{console.error(error)}

		});


	},

	displayLiveDataTable: function() {

		var liveStatementsData = [];

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

			var timeRemainingSeconds = Math.floor(stakeEndTime - Date.now()/1000);

			var cardHtml = App.collapsingCardHTMLformat(statementID, statementText, ethStaked, statementSource, stakeEndTime);
			var ethStakedHtml = `<p class="display-4 text-center">${ethStaked}</p>`

			if (!stakeEnded) {
				liveStatementsData.push([ethStakedHtml, cardHtml]);
			}

		}

		console.log(liveStatementsData);

		$('#statementTable').DataTable( {
	        data: liveStatementsData,
	        columns: [
	            { title: "Sort by Value" },
	            { title: "Sort by Recency"}  //TODO: Need to change html in collapsingCardHTMLformat() to data-order by recency
	        ]
	    });
	},


	getStatementDataAndDisplayPopularStakes: function(_index, _numStatements, _contractInstance) {
		// Queries blockchain for statement data

		_contractInstance.statements(_index, function(error, statement) {

			if(!error){	

				var ethStaked = statement[6].toNumber();

				App.allStatementsArray.push(statement); // Push full statement array to array

				if (App.allStatementsArray.length == _numStatements) {
					App.displayPopularStakes(); // If all statements collected, build data table
					// App.displayPastDataTable();
				}

			}

			else{console.error(error)}

		});


	},

	displayPopularStakes: function() {
		var popularStatementsLiveData = [];
		var liveEthStakedArray = [];

		var popularStatementsPastData = [];
		var pastEthStakedArray = []

		// Sort the statements into live/past
		for (var i = 0; i < App.allStatementsArray.length; i++) {
			var statement = App.allStatementsArray[i];
			var stakeEnded = statement[7];
			var ethStaked = statement[6].toNumber();

			// if live
			if (!stakeEnded) {
				liveEthStakedArray.push(ethStaked);
				popularStatementsLiveData.push(statement);
			}

			//if past
			else {
				pastEthStakedArray.push(ethStaked);
				popularStatementsPastData.push(statement);
			}

		}

		// Number of statements to be displayed (for live and past)
		var numPopularStatementsDisplayed = 3;

		// Popular Live Statement Display
		var indicesOfMaxLiveEth = App.findIndicesOfMaxInArray(liveEthStakedArray, numPopularStatementsDisplayed);

		var popularLiveStakesCards = $("#popularLiveStakesCards");
		popularLiveStakesCards.empty();

		for (let s=0; s<numPopularStatementsDisplayed; s++) {
			var idx = indicesOfMaxLiveEth[s];
			var statement = popularStatementsLiveData[idx];

			var statementID = statement[0];
			var statementText = statement[1];
			var stakeDuration = statement[2];
			var stakeEndTime = statement[3];
			var marketMaker = statement[4];
		 	var numStakes = statement[5];
			var ethStaked = (statement[6] / 10**18).toFixed(3);
			var stakeEnded = statement[7];
			var statementSource = statement[8];

			var html = App.collapsingCardHTMLformatLiveData(statementID, statementText, ethStaked, statementSource, stakeEndTime);

			popularLiveStakesCards.append(html);

		}


		// Popular Past Statement Display
		var indicesOfMaxPastEth = App.findIndicesOfMaxInArray(pastEthStakedArray, numPopularStatementsDisplayed);

		var popularPastStakesCards = $("#popularPastStakesCards");
		popularPastStakesCards.empty();

		for (let s=0; s<numPopularStatementsDisplayed; s++) {
			var idx = indicesOfMaxPastEth[s];
			var statement = popularStatementsPastData[idx];

			var statementID = statement[0];
			var statementText = statement[1];
			var stakeDuration = statement[2];
			var stakeEndTime = statement[3];
			var marketMaker = statement[4];
		 	var numStakes = statement[5];
			var ethStaked = (statement[6] / 10**18).toFixed(3);
			var stakeEnded = statement[7];
			var statementSource = statement[8];
			var verdict = statement[9];

			var html = App.collapsingCardHTMLformatPastData(statementID, statementText, ethStaked, statementSource, stakeEndTime, verdict);

			popularPastStakesCards.append(html);


		}

		$("#loader").hide();
	    $("#blockchain-content").show();

	},

	findIndicesOfMaxInArray: function(arr, n) {
		var maxi_array = [];

		for(let i=0; i<n; i++){
			var max = Math.max.apply(null, arr), // get the max of the array
	        maxi = arr.indexOf(max); // find index of max
	        maxi_array.push(maxi); //place max indices in array
		    arr[maxi] = -Infinity; // replace max in the array with -infinity
		}

	    return maxi_array;
	},

	// displayPastDataTable: function() {

	// 	var pastStatementsData = [];

	// 	for (var i = 0; i < App.allStatementsArray.length; i++) {

	// 		var statement = App.allStatementsArray[i];

	// 	  	var statementID = statement[0];
	// 		var statementText = statement[1];
	// 		var stakeDuration = statement[2];
	// 		var stakeEndTime = statement[3];
	// 		var marketMaker = statement[4];
	// 	 	var numStakes = statement[5];
	// 		var ethStaked = (statement[6] / 10**18).toFixed(3);
	// 		var stakeEnded = statement[7];
	// 		var statementSource = statement[8];

	// 		var cardHtml = App.collapsingCardHTMLformat(statementID, statementText, ethStaked, statementSource);

	// 		if (stakeEnded) {
	// 			pastStatementsData.push([stakeEndTime, cardHtml]);
	// 		}

	// 	}

	// 	console.log(pastStatementsData);

	// 	$('#statementTable').DataTable( {
	//         data: pastStatementsData,
	//         columns: [
	//             { title: "Recency" },
	//             { title: "Eth"}
	//         ]
	//     });
	// },

	collapsingCardHTMLformatLiveData: function(statementID, statementText, ethStaked, statementSource, stakeEndTime) {

		var html = `<div class="card bg-transparent border-0 mb-3" id="card${statementID}">
		                
		                <div class="card-header bg-transparent text-center" id="cardHeading${statementID}" data-toggle="collapse" data-target="#cardBodyCollapse${statementID}" aria-expanded="false" aria-controls="collapse${statementID}">
		                    <button class="btn-default border-0 bg-light">
		                    	<abbr class="text-center lead text-primary">${ethStaked} eth</abbr>
		                      	<p class="font-weight-light">${statementText}</p>
		                    </button>
		                </div>


		                <div class="card-body collapse" id="cardBodyCollapse${statementID}" aria-labelledby="heading${statementID}" data-parent="#liveStatementsAccordion">

			                <div class="card-body text-center">

			                  	<form method="POST" onSubmit="App.makeStake(${statementID}, stakePosition${statementID}, stakeValue${statementID}); return false;">

			                  		<div class="container">
			                  			<div class="row">
					                  		<div class="col-md-6 offset-md-3 text-center">
							                    <div class="btn-group btn-group-toggle" data-toggle="buttons" role="group" aria-label="Center Align">
												    <label button class="btn btn-truefalse btn-light">
												    	<input type="radio" id="trueButton${statementID}" value="1" name="stakePosition${statementID}">True
												    </label>
												    <label button class="btn btn-truefalse btn-light">
												    	<input type="radio" id="falseButton${statementID}" value="0" name="stakePosition${statementID}">False
												    </label>
												</div>
											</div>
										</div>
									
										<br/>
										<div class="row">
											<div class="col-md-8 offset-md-2 text-center mb-3">
												<div class="input-group">
												    <div class="input-group-prepend">
												    	<span class="input-group-text text-monospace text-center" for="stakeValue${statementID}">Stake Amount:</span>
												    </div>
												  	<input class="text-center form-control" type="number" id="stakeValue${statementID}" name="stakeValue${statementID}" placeholder="0.750 eth" step="0.001"/>
												  	<div class="input-group-append">
												        <button class="btn btn-stake" type="submit">Stake</button>
												    </div>
												</div> 
											</div>
										</div>
									</div>

					            </form>
					            <br/>

			                  
			                    <div class="statement-source text-center">
			                    	<small class="text-muted">source: <a href="https://www.google.com/search?q=${statementSource}" target="_blank"> ${statementSource}</a></small>
			                    </div>

			                </div>

		            	<hr/>

		                </div>

		            </div>`

		return html

	},

	collapsingCardHTMLformatPastData: function(statementID, statementText, ethStaked, statementSource, stakeEndTime, verdict) {
		var html = `<div class="card bg-light border-0 mb-3" id="card${statementID}">
		                <div class="card-header bg-transparent text-center" id="cardHeading${statementID}" data-toggle="collapse" data-target="#cardBodyCollapse${statementID}" aria-expanded="false" aria-controls="collapse${statementID}">
		                    <button class="card-btn bg-light" >
		                    	<abbr class="lead">${ethStaked} eth</abbr>
		                      	<p class="font-weight-light">${statementText}</p>
		                      	<p class="font-weight-light">Verdict: ${verdict}</p>
		                    </button>
		                </div>



		                <div class="card-body collapse" id="cardBodyCollapse${statementID}" aria-labelledby="heading${statementID}" data-parent="#pastStatementsAccordion">

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

	makeNewStatement: function(_newStatementString, _newStatementPosition, _newStatementStakingPeriod, _newStatementSource, _newStatementStakeValue) {

		var newStatementString = _newStatementString.value;
		var newStatementPosition = _newStatementPosition.value;
		var newStatementStakingPeriod = Math.floor(_newStatementStakingPeriod.value*24*60*60); //convert days to seconds
		var newStatementSource = _newStatementSource.value;
		var newStatementStakeValue = _newStatementStakeValue.value;

		console.log(newStatementString, newStatementPosition, newStatementStakingPeriod, newStatementSource, newStatementStakeValue);

		if (!newStatementSource){	
			newStatementSource = "";
		}

		if (!newStatementStakingPeriod) {
			newStatementStakingPeriod = 7*24*60*60 // default to 7 days 
		}


		if (!App.account) {
	    	alert("Please sign into MetaMask and refresh the page.");
	    }

		else if (!newStatementString){	
			console.log("Please complete the form.");
			alert("You must enter the statement first.");
		}

		else if (!newStatementPosition){	
			console.log("Please complete the form.");
			alert("You must choose true or false.");
		}

		else if (!newStatementStakeValue){	
			console.log("Please complete the form.");
			alert("You must enter the initial stake.");
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
					console.log("makeNewStatement success! tx hash:", result);
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

	    if (!App.account) {
	    	alert("Please sign into MetaMask and refresh the page.");
	    }

	    else if (!stakePosition) {
	    	alert("Please choose True or False.")
	    }

	    else if (!stakeValue) {
			alert("Please set the stake amount.");
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
