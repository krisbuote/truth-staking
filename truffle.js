module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      // port: 8545, // ganache-cli default port
      port: 7545, //ganache UI default port
      network_id: "*" // Match any network id
    }
  }
};
