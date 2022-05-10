import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
import { contractFactory } from "../utils";

describe("# Migration", () => {
	it("should migrate contract", async () => {
		const Migration = await ethers.getContractFactory(
			contractFactory.Migration
		);
		const migrationIns = await (await Migration.deploy()).deployed();

		expect(await migrationIns.migrated()).to.be.equal(true);
	});
});
