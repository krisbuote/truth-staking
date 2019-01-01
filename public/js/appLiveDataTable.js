const Web3 = require('web3');
const contractAddress = '0x3c02dac293EC087EF59ee4De0F50354b0B062DD3'
const contractABI = [{"constant":false,"inputs":[{"name":"_newServiceFeeTenThousandths","type":"uint256"}],"name":"setServiceFeeTenThousandths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStatements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"beneficiaryAddresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"}],"name":"endStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_confirm","type":"bytes"}],"name":"SELF_DESTRUCT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absEthStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"serviceFeeTenThousandths","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statementID","type":"uint256"},{"name":"_position","type":"uint256"}],"name":"stake","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiaryAddress","type":"address"},{"name":"_beneficiaryShareTenThousandths","type":"uint256"}],"name":"addBeneficiary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statements","outputs":[{"name":"id","type":"uint256"},{"name":"statement","type":"string"},{"name":"stakeDuration","type":"uint256"},{"name":"stakeBeginningTime","type":"uint256"},{"name":"stakeEndTime","type":"uint256"},{"name":"marketMaker","type":"address"},{"name":"numStakes","type":"uint256"},{"name":"ethStaked","type":"uint256"},{"name":"stakeEnded","type":"bool"},{"name":"source","type":"string"},{"name":"verdict","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"},{"name":"_beneficiaryAddress","type":"address"}],"name":"removeBeneficiary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"beneficiaryShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPctTimeRemainingThreshold","type":"uint256"},{"name":"_newMinTimeAddPct","type":"uint256"},{"name":"_newMaxTimeAddPct","type":"uint256"},{"name":"_newMinPotPctThreshold","type":"uint256"},{"name":"_newMaxPotPctThreshold","type":"uint256"}],"name":"setAddTimeParameters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_statement","type":"string"},{"name":"_position","type":"uint256"},{"name":"_stakeDuration","type":"uint256"},{"name":"_source","type":"string"}],"name":"newStatement","outputs":[{"name":"statementID","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"absNumStakes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"TruePotFinal","type":"uint256"},{"indexed":false,"name":"FalsePotFinal","type":"uint256"},{"indexed":false,"name":"winningPosition","type":"uint256"},{"indexed":false,"name":"numStakes","type":"uint256"}],"name":"StakeEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"totalPot","type":"uint256"}],"name":"CurrentPot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"statementID","type":"uint256"},{"indexed":false,"name":"statement","type":"string"},{"indexed":false,"name":"stakeEndTime","type":"uint256"},{"indexed":false,"name":"source","type":"string"}],"name":"NewStatement","type":"event"}]


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
	      App.web3Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7fc00002ff7d4254a08edebf534414b0');
	      web3 = new Web3(App.web3Provider);
	    }
	    return App.initContract();
	},	

	initContract: function() {

		App.truthStakingContract = web3.eth.contract(contractABI);

		return App.render();
	},

	render: function() {

	    $("#loader").show();
	    $("#blockchain-content").hide();

	    // Load account data
	    web3.eth.getCoinbase(function(err, account) {
	      if (err === null) {
	        App.account = account;
	        $("#accountAddress").html("Your Account: " + account);
	      }
	    });

	    // Instantiate contract instance
		var contractInstance = App.truthStakingContract.at(contractAddress);

		// Build data table out of live statements
		contractInstance.absNumStatements(function(error, _numStatements){ 

			if(!error) {
				App.allStatementsArray = [];
				App.getStatementDataAndBuildLiveTable(_numStatements.toNumber(), contractInstance);
			}

			else {
				console.error(error)
			}

		});
	
	},

	

	getStatementDataAndBuildLiveTable: function(_numStatements, _contractInstance) {

		App.liveStatementsArray = [];

		for (var i = 0; i < _numStatements; i++) {

			// Queries blockchain for statement data
			_contractInstance.statements(i, function(error, statement) {

				if(!error){
					
					App.allStatementsArray.push(statement); // Push to array

					var stakeEnded = statement[8];

					if (!stakeEnded) {
						App.liveStatementsArray.push(statement) // if live
					}

					if (App.allStatementsArray.length == _numStatements) {
						App.displayLiveDataTable(); // If all statements collected, build data table
					}
				}

				else{console.error(error)}

			});
		}


	},

	displayLiveDataTable: function() {

		var liveStatementsData = [];
		var liveEthSum = 0;

		// MetaMask check. if they are not using MetaMask, the Stake and newStatement buttons are popovers to inform them
		// default is assuming metamask is logged in
		var stakeButtonHTML = `<button class="btn btn-stake text-center" type="submit">Stake</button>`
		var newStatementButtonHTML = `<button id="newStatementSubmit" type="submit" class="btn btn-primary float-right">Submit</button>`

		if (App.account == null || App.account == '0x0') {
			stakeButtonHTML =`<button type="button" class="btn btn-stake text-center" data-toggle="popover" data-placement="bottom" 
									data-content="Truth Staking uses <a href='https://metamask.io/'>MetaMask</a> to secure your transactions. 
									<br><br>If you have MetaMask installed, please sign in and refresh the page." data-html="true">Stake</button>`	

			newStatementButtonHTML = `<button type="button" class="btn btn-primary float-right" data-toggle="popover" data-placement="bottom" 
									data-content="Truth Staking uses <a href='https://metamask.io/'>MetaMask</a> to secure your submissions. 
									<br><br>If you have MetaMask installed, please sign in and refresh the page." data-html="true">Submit</button>`	
		}
		$("#newStatementButton").html(newStatementButtonHTML);


		for (var i = 0; i < App.liveStatementsArray.length; i++) {

			var statement = App.liveStatementsArray[i];

			var statementID = statement[0];
			var statementText = statement[1];
			var stakeDuration = statement[2];
			var stakeBeginningTime = statement[3];
			var stakeEndTime = statement[4];
			var marketMaker = statement[5];
		 	var numStakes = statement[6];
			var ethStaked = (statement[7] / 10**18).toFixed(3);
			var stakeEnded = statement[8];
			var statementSource = statement[9];


			liveEthSum += Number(ethStaked);

			var timeRemainingSeconds = stakeEndTime - Math.floor(Date.now()/1000);

			if (timeRemainingSeconds > 0) {
				var timeRemainingFormatted = App.secondsToDhm(timeRemainingSeconds);
			}
			else {
				var timeRemainingFormatted = "FINISHED"
			}
			
			var cardHtml = App.collapsingCardHTMLformatLiveData(statementID, statementText, ethStaked, statementSource, timeRemainingFormatted, stakeEndTime, stakeButtonHTML);
			var ethStakedHtml = `<div class="container" class="stake-table-eth text-center">
									<h3>${ethStaked}</h3> 
									<h4>ETH</h4>
								</div>`

			liveStatementsData.push([ethStakedHtml, cardHtml]);
				
		}

		$("#liveNumStatements").html(App.liveStatementsArray.length);
		$("#liveEthStaked").html(liveEthSum.toFixed(3));

		// Build Data table
		$('#liveStatementTable').DataTable( {
	        data: liveStatementsData,
	        columns: [
	            { title: "Value" },
	            { title: "Ending Soon"} 
	        ],
	        "order": [[ 0, "desc" ]],
	        keepConditions: true,
	        responsive: true
	    });

  		//show content
		$("#loader").hide();
	    $("#blockchain-content").show();

	    // enable popovers
  		$('[data-toggle="popover"]').popover({html:true});

	},

	collapsingCardHTMLformatLiveData: function(statementID, statementText, ethStaked, statementSource, timeRemainingFormatted, stakeEndTime,stakeButtonHTML) {

		var html = `<td data-order="${stakeEndTime}">
						<div class="card bg-transparent border-0 mb-3" id="card${statementID}">
			                
			                <div class="card-header bg-transparent text-center" id="cardHeading${statementID}" data-toggle="collapse" data-target="#cardBodyCollapse${statementID}" aria-expanded="false" aria-controls="collapse${statementID}">
			                    <button class="btn-default border-0 bg-light">
			                      	<p class="stake-table-statement font-weight-light lead">${statementText}</p>
			                    </button>
			                </div>


			                <div class="card-body collapse" id="cardBodyCollapse${statementID}" aria-labelledby="heading${statementID}" data-parent="#liveStatementsAccordionTable">

				                <div class="card-body text-center">

									<form method="POST" onSubmit="App.makeStake(${statementID}, stakePosition${statementID}, stakeValue${statementID}); return false;">

				                  		<div class="container">
				                  			<div class="row">
						                  		<div class="col-md-6 offset-md-3">
								                    <div class="btn-group btn-group-toggle" data-toggle="buttons" role="group" aria-label="Center Align">
													    <label button class="btn btn-truefalse btn-light">
													    	<input type="radio" class="text-center" id="trueButton${statementID}" value="1" name="stakePosition${statementID}">True
													    </label>
													    <label button class="btn btn-truefalse btn-light">
													    	<input type="radio" class="text-center" id="falseButton${statementID}" value="0" name="stakePosition${statementID}">False
													    </label>
													</div>
												</div>
											</div>
										
											<br/>
		


										    <div class="form-group row">
										    	<div class="col-md-4 offset-md-4">
											    	<input class="text-center" type="number" id="stakeValue${statementID}" placeholder="0.750 ether" step="0.000001"/>
												</div>
											</div>
											<div class="form-group row">
												<div class="col-md-4 offset-md-4">
													${stakeButtonHTML}
												</div>
											</div>

										</div>
									</form>

						            <br/>


				                  	<div class="text-center my-auto">
				                    	<small class="text-muted">time remaining: ${timeRemainingFormatted}</small>
				                   	</div>
				                    <div class="text-center my-auto">
				                    	<small class="text-muted">source: <a href="https://www.google.com/search?q=${statementSource}" target="_blank"> ${statementSource}</a></small>
				                    </div>

				                </div>

			            	<hr/>

			                </div>

			            </div>
			        </td>`

		return html

	},

	makeNewStatement: function(_newStatementString, _newStatementPosition, _newStatementStakingPeriod, _newStatementSource, _newStatementStakeValue) {

		var newStatementString = _newStatementString.value;
		var newStatementPosition = _newStatementPosition.value;
		var newStatementStakingPeriod = Math.floor(_newStatementStakingPeriod.value*24*60*60); //convert days to seconds
		var newStatementSource = _newStatementSource.value;
		var newStatementStakeValue = _newStatementStakeValue.value;

		if (!newStatementSource){	
			newStatementSource = "none";
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
					alert("Success!");
					console.log("makeNewStatement success! tx hash:", result);
				}
				else {
					console.error(err);
				}
			});

		}

	},

	makeStake: function(_statementID, _stakePosition, _stakeValue) {
	    var statementIdToStake = _statementID;
	    var stakePosition = _stakePosition.value;
	    var stakeValue = _stakeValue.value;

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
		    		console.log('makeStake() success: ',result);
		    		App.successTxHash(result);
		    	}

		    	else {
		    		alert("Transaction failed.");
		    		console.error("makeStake() failed");
		    		console.error(error);
		    	}

		    });

	    }

    },



    secondsToDhm: function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600*24));
	var h = Math.floor(seconds % (3600*24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 3600 % 60);

	var dDisplay = d > 0 ? d + "d:" : "";
	var hDisplay = h > 0 ? h + "h:" : "";
	var mDisplay = m > 0 ? m + "m" : "";

	return dDisplay + hDisplay + mDisplay;
	
	},

	successTxHash: function(tx) {
		var s = "Success! tx hash: " + String(tx);
		alert(s);
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
  $(window).on("load", function() {
    App.init();
  });
});

