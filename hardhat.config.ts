import "ethereum-waffle";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import dotenv from "dotenv";
import "./scripts/tasks";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { DEPLOYER_PRIVATE_KEY, PROJECT_ID, ETHERSCAN_API_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${PROJECT_ID}`,
      accounts: [`${DEPLOYER_PRIVATE_KEY}`],
      gasPrice: 225000000000
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    showTimeSpent: true,
    showGasSpent: true,
    token: "ETH",
    currency: "USD",
    coinmarketcap: "2bb80343-6daa-4193-8f2b-732eba7a2e56"
  }
};
