var TruthStaking = artifacts.require("./TruthStaking.sol");

// relies on Mocha and Chai packages
contract("TruthStaking", function(accounts) {
	var TruthStakingInstance;

	let wallet0 = accounts[0];
	let wallet1 = accounts[1];
	let wallet2 = accounts[2];
	let wallet3 = accounts[3];
	let wallet4 = accounts[4];
	let wallet5 = accounts[5];
	let wallet6 = accounts[6];
	let wallet7 = accounts[7];
	let wallet8 = accounts[8];
	let wallet9 = accounts[9];


	it("initializes with state vars", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.absNumStatements();
		}).then(function(absNumStatements) {
			assert.equal(absNumStatements.toNumber(), 0, "absNumStatements exists");
			console.log('absNumStatements: ', absNumStatements);
			return TruthStakingInstance.absEthStaked();
		}).then(function(absEthStaked) {
			assert.equal(absEthStaked.toNumber(), 0, "absEthStaked exists and is zero");
			console.log('absEthStaked', absEthStaked);
		});
	});

	it("allows first service fee set", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.setServiceFeeTenThousandths(175);
		}).then(function(result) {
		});
	});


	it("allows one beneficiary to be added and then deleted", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.addBeneficiary(wallet3, 175);
		}).then(function(result) {
			return TruthStakingInstance.beneficiaryAddresses(0); // check if added
		}).then(function(result) {
			console.log(result);
		return TruthStakingInstance.beneficiaryShares(result);
		}).then(function(result) {
			console.log(result);
			return TruthStakingInstance.removeBeneficiary(0, wallet3);
		}).then(function(result) {
			return TruthStakingInstance.beneficiaryAddresses(0); // check if deleted 
		}).then(function(result) {
			console.log(result);
			return TruthStakingInstance.beneficiaryShares(result);
		}).then(function(result) {
			console.log(result);
		});
	});

	it("allows beneficiaries to be added", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.addBeneficiary(wallet8, 25);
		}).then(function(result) {
			return TruthStakingInstance.addBeneficiary(wallet9, 33);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet1, 34);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet2, 35);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet3, 36);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet4, 37);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet5, 38);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet6, 39);
		}).then(function(result){
			return TruthStakingInstance.addBeneficiary(wallet7, 40);
		}).then(function(result){
			
			
		});
	});

	it("allows beneficiary address/shares to be read", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.beneficiaryAddresses(1);
		}).then(function(result) {
			console.log(result);
			return TruthStakingInstance.beneficiaryShares(result);
		}).then(function(result) {
			console.log(result);
		});
	});

	it("removes beneficiary", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.removeBeneficiary(1, wallet8);
		}).then(function(result) {
			return TruthStakingInstance.beneficiaryAddresses(1); // check if replaced 
		}).then(function(result) {
			console.log(result);
			return TruthStakingInstance.beneficiaryShares(result);
		}).then(function(result) {
			console.log(result);
			return TruthStakingInstance.beneficiaryShares(wallet8); // check == 0
		}).then(function(result) {
			console.log(result);
		});
	});
	

	it("Doesn't allow endStake() on invalid statementID", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.endStake(100);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
		});
	});

	it('allows new statement creation', function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.newStatement("New Statement of typical lorem ipsum lenght alchemical stuff inserted in the psyche and found to destroy donald Trump through individuation.New Statement of typical lorem ipsum lenght alchemical stuff inserted in the psyche and found to destroy donald Trump through individuation.", 1, 36000, " source: www.newyourktimes.com/stuff/here ", {from:wallet1, value:10**18});
			}).then(function(result) {
			assert.equal(result.logs.length, 3, "correct number of events triggered");
		});

	});

	makeNstatments(1);


	it('allows statements() call', function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.statements(0);
			}).then(function(result) {
		});

	});




	it("allows stake on statement(0)", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.stake(0, 0, {from:wallet1, value:10**9});
			}).then(function(result) {
		});
	});

	makeNstakes(1, 0, 0);


	it("allow endStake() on valid statementID", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.endStake(0);
		}).then(function(result) {
			// console.log(result);
		});
	});

	// // TEST ADD TIME FUNCTION


	// it('allows new statement with 61 seconds, prints stakeEndTime, waits, stakes large to add time', function() {
	// 	return TruthStaking.deployed().then(function(instance) {
	// 		TruthStakingInstance = instance;
	// 		return TruthStakingInstance.newStatement("New Statement to test add time.", 1, 61, " source: www.love.com.com/me ", {from:wallet1, value:10**9});
	// 		}).then(function(result) {
	// 		assert.equal(result.logs.length, 3, "correct number of events triggered");
	// 		return TruthStakingInstance.statements(1);
	// 	}).then(function(result) {
	// 		console.log("Statement end time original:", result);
	// 		wait(50000); //wait 50 seconds
	// 		return TruthStakingInstance.stake(1,1, {from:wallet6, value:10**9});
	// 	}).then(function(result) {
	// 		return TruthStakingInstance.statements(1);
	// 	}).then(function(result){
	// 		console.log("statement end time new:", result);
	// 	});

	// });





	it("allows self_destruct()", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.SELF_DESTRUCT("Yes, I really want to destroy this contract forever.");
		}).then(function(result) {
		});
	});



	function makeNewStatement() {
		it('allows new statement creation', function() {
			return TruthStaking.deployed().then(function(instance) {
				TruthStakingInstance = instance;
				return TruthStakingInstance.newStatement("New Statement of typical lorem ipsum lenght alchemical stuff inserted in the psyche and found to destroy donald Trump.", 1, 36000, " source: www.love.com.com/me ", {from:wallet1, value:10});
				}).then(function(result) {
				assert.equal(result.logs.length, 3, "correct number of events triggered");
			});

		});

	}

	function makeNstatments(n) {
		for (let i=0; i<n; i++) {
			console.log("statementCreation call ", i);
			makeNewStatement();
		}
	}

	function makeNewStake(id, pos) {
		it('allows new stake on valid statementID', function() {
			return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.stake(id, pos, {from:wallet2, value:10**9});
			}).then(function(result) {
			assert.equal(result.logs.length, 2, "correct number of events triggered");
			assert.equal(result.logs[0].event, "NewStake", "the event type is correct");
			assert.equal(result.logs[1].event, "CurrentPot", "the event type is correct");
			});

		});
	}

	function makeNstakes(n, id, pos) {
		for (let i=0; i<n; i++) {
			console.log("stakeCreation call ", i);
			makeNewStake(id, pos);
		}
	}


	function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
	}





});


