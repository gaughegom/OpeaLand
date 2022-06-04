import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "ethereum-waffle";
import { solidity } from "ethereum-waffle";
import chai from "chai";
import "hardhat-gas-reporter";
import "./scripts/tasks";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
//override with node env
dotenv.config({ path: path.join(__dirname, `.env.${process.env.NODE_ENV}`) });
chai.use(solidity);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { DEPLOYER_PRIVATE_KEY, PROJECT_ID, ETHERSCAN_API_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "rinkeby",
	networks: {
		hardhat: {
			chainId: 1337
		},
		rinkeby: {
			url: `https://arbitrum-rinkeby.infura.io/v3/${PROJECT_ID}`,
			accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
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
