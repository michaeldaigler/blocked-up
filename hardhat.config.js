require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const path = require('path')
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config({ path: "./.env" })

const RINKEBY_ENDPOINT = process.env.INFURA_RINKEBY_ENDPOINT

module.exports = {
  artifacts: path.join(__dirname, '/password-manager/src/contracts'),

  networks: {
    hardhat: {
      accounts: ["0x522dB1211a0964A5c9DBE362741ca9c48C01394B"]
    },
    rinkeby: {
      url: RINKEBY_ENDPOINT,
      accounts: [],
    }
  },
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./password-manager/src/artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

