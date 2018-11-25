var TruthStaking = artifacts.require("./TruthStaking.sol");

module.exports = function(deployer) {
	// Place constructor arguments: deployer.deploy(contractName, arg1, arg2,...);
  	deployer.deploy(TruthStaking);
};
