# Truth Staking

## Overview

A decentralized application that allows the crowd to stake ether on the truthfulness of claims made by the media. If your peers agree with you, you win.

[truthstaking.com](http://truthstaking.com)

[Watch a video here](https://www.youtube.com/watch?v=EghSqZ1hxnc&ab_channel=TruthStaking)

The crowd stakes ETH on a claim made in the media as being True or False. After a period of time elapses, the majority wins and shares the distributed stakes from the minority.

The idea is to percolate truth through financial markets - somewhat similar to prediction markets. 

Game theory flaws exist. It's a first attempt at an important problem.

## Truth Staking Smart Contract
This smart contract allows users to do 2 things:
  1) Submit statements that are TRUE or FALSE.
  2) Stake on submitted statements.

After the staking period for the statement ends, the TRUE and FALSE pots of ether are counted. 
The larger pot wins, and the smaller pot is distributed amongst the winners, proportional to the size of their stakes.
The "market maker" (the address that submitted the statement) receives an extra reward proportional to her first stake.


## Developer Setup
### Requirements
+ [node](https://nodejs.org/en/)
+ [truffle](https://www.npmjs.com/package/truffle)
+ [ganache](https://truffleframework.com/ganache)
+ [metamask](https://metamask.io/)
### Documentation

0. Install Ganache, truffle, node, metamask
1. To get working full-stack template: $truffle unbox pet-shop 
2. To compile smart contracts and build the .json: $truffle compile
3. have ganache open
4. To launch smart contract, you will be using the javascript files in /migrations/. Adjust code for any new smart contract file names.
4.1 If your contract constructor takes arguments, place them in the deployer
5. Initial migration of code to blockchain instance (running with Ganache): $truffle migrate
6. If you change your smart contract code and want to update: $truffle migrate --reset // note this will reset everything
7. interact with the smart contract from console with: $truffle console
8. Once in console, enter $contractName.deployed().then(function(i) { app = i; }) // this should return 'undefined'
9. Call contract functions with app.functionName(x,y,z, { from : 0x123..., value : 10 }) // {} contains metadata for the function
10. View blockchain stuff with $web3.eth.X . $web3.eth.accounts returns account addresses in Ganache
11. Use contractname.js in /test/ to test the contract in action using Mocha and Chai it(...) tests. Run $truffle test

### Testing
+ Have test scripts in ./test/. 
+ $ganache-cli   (launches blockchain simulator)
+ $truffle compile (compiles contracts)
+ $truffle test   (tests scripts)

### General troubleshooting
+ if making a transaction with metamask and tx nonce is mismatched from ganache network's tx nonce, reset your account in metamask:
https://consensys.zendesk.com/hc/en-us/articles/360004177531-Resetting-an-Account-New-UI-

### Stuff
+ Provide pre-filtered datatable search by using truthstaking.com/stakes/live/#dataTableID=fWords%20of%20Interest  
