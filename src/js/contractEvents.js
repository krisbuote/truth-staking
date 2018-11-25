// https://medium.com/coinmonks/node-js-backend-service-for-ethereum-dapp-sotp-part-3-2d3aa5ec50e9
// see tutorial

const contractInstance = new web3.eth.Contract(contract.abi, contractAddress)
const events = await contractInstance.getPastEvents('allEvents', {fromBlock: fromBlock})
const promises = _.map(events, (obj) => {
  return handleEvent(obj)
})

await Promise.all(promises)	