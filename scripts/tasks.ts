import "@nomiclabs/hardhat-waffle";
import { task } from "hardhat/config";
import { contractFactory } from "../utils";
import { getAccount } from "./helper";

task(
	"accounts",
	"Print the list of accounts in dev env",
	async (taskArgs, hre) => {
		const accounts = await hre.ethers.getSigners();

		accounts.map((e) => console.log(e.address));
	}
);

task("deploy-migrate", "Test deploy a migration contract").setAction(
	async function (taskArgs, hre) {
		const MigrationContract = await hre.ethers.getContractFactory(
			contractFactory.Migration,
			getAccount()
		);
		const migrationIns = await MigrationContract.deploy();
		await migrationIns.deployed();

		console.log(`Migration contract deploy to: ${migrationIns.address}`);
	}
);

task("deploy", "Deploy contract on chain").setAction(async function (
	taskArgs,
	hre
) {});
