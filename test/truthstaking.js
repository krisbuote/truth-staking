var TruthStaking = artifacts.require("./TruthStaking.sol");

// relies on Mocha and Chai packages
contract("TruthStaking", function(accounts) {
	var TruthStakingInstance;

	let wallet0 = accounts[0];
	let wallet1 = accounts[1];
	let wallet2 = accounts[2];
	let wallet3 = accounts[3];


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

	it('allows new statement creation', function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.newStatement("New Statement", 1, 36000, " source ", {from:web3.eth.accounts[0], value:0.001});
			}).then(function(result) {
			assert.equal(result.logs.length, 1, "correct number of events triggered");
			assert.equal(result.logs[0].event, "NewStatement", "the event type is correct");
		});

	});





});


function makeNstatments(n) {
	for (let i=0; i<n; i++) {
		console.log("statementCreation call ", i);
		makeNewStatement();
	}
}

function makeNewStatement() {
	it('allows new statement creation', function() {
		return TruthStaking.deployed().then(function(instance) {
			TruthStakingInstance = instance;
			return TruthStakingInstance.newStatement("New Statement", 1, 36000, " source ", {from:web3.eth.accounts[0], value:0.001});
			}).then(function(result) {
			assert.equal(result.logs.length, 1, "correct number of events triggered");
			assert.equal(result.logs[0].event, "NewStatement", "the event type is correct");
		});

	});

}