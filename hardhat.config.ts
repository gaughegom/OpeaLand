import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "ethereum-waffle";
import { solidity } from "ethereum-waffle";
import chai from "chai";
import "hardhat-gas-reporter";
import "./scripts/tasks";

chai.use(solidity);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337
		}
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
