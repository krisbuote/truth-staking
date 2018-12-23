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
			return TruthStakingInstance.setServiceFeeTenThousandths(1000);
		}).then(function(result) {
		});
	});

	it('allows new statement creation', function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.newStatement("New Statement of typical lorem ipsum lenght alchemical stuff inserted in the psyche and found to destroy donald Trump through individuation.New Statement of typical lorem ipsum lenght alchemical stuff inserted in the psyche and found to destroy donald Trump through individuation.", 1, 61, " source: www.newyourktimes.com/stuff/here ", {from:wallet5, value:0.5*(10**18)});
			}).then(function(result) {
			assert.equal(result.logs.length, 3, "correct number of events triggered");
		});

	});

	it("allows stakes on statement(0). wallet 9 should receive 0.5*4 ether", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.stake(0, 1, {from:wallet6, value:0.5*(10**18)});
			}).then(function(result) {
			return TruthStakingInstance.stake(0, 1, {from:wallet7, value:0.5*(10**18)});
			}).then(function(result) {
			return TruthStakingInstance.stake(0, 1, {from:wallet8, value:0.5*(10**18)});
			}).then(function(result) {
			return TruthStakingInstance.stake(0, 0, {from:wallet9, value:5*(10**18)});
		});
	});


	it("allow endStake() on valid statementID for ended stake", function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			wait(60000);
			return TruthStakingInstance.endStake(0);
		}).then(function(result) {
			// console.log(result);
		});
	});




	function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
	}

});
