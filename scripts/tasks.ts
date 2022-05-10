import "@nomiclabs/hardhat-waffle";
import { task } from "hardhat/config";

task(
	"accounts",
	"Print the list of accounts in dev env",
	async (taskArgs, hre) => {
		const accounts = await hre.ethers.getSigners();

		accounts.map((e) => console.log(e.address));
	}
);
