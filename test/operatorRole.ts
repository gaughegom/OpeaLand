import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { contractFactory } from "../utils";

let signers: SignerWithAddress[];

let OwnOperatorRole: ContractFactory;
let ownOperatorRoleIns: Contract;

before(async () => {
	signers = await ethers.getSigners();
	OwnOperatorRole = await ethers.getContractFactory(
		contractFactory.OwnableOperatorRole
	);
});

describe("# OwnableOperatorRole", () => {
	beforeEach(async () => {
		ownOperatorRoleIns = await OwnOperatorRole.deploy();
		await ownOperatorRoleIns.deployed();
	});

	it("should allow owner to add bearer", async () => {
		const tx = await ownOperatorRoleIns.add(signers[3].address);
		await tx.wait();

		await expect(tx)
			.to.be.emit(ownOperatorRoleIns, "AddOperator")
			.withArgs(signers[3].address);
		expect(await ownOperatorRoleIns.isOperator(signers[3].address)).to.be.equal(
			true
		);
	});

	it("should allow owner to remove bearer", async () => {
		await (await ownOperatorRoleIns.add(signers[3].address)).wait();
		const tx = await ownOperatorRoleIns.remove(signers[3].address);
		await tx.wait();

		expect(tx)
			.to.be.emit(ownOperatorRoleIns, "RemoveOperator")
			.withArgs(signers[3].address);
		expect(await ownOperatorRoleIns.isOperator(signers[3].address)).to.be.equal(
			false
		);
	});

	it("should NOT allow non-owner to add bearer", async () => {
		const ownOperatorRoleFromStranger = ownOperatorRoleIns.connect(signers[6]);
		const tx = ownOperatorRoleFromStranger.add(signers[3].address);
		await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
	});
});
