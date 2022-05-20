import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { contractFactory } from "../utils";

let signers: SignerWithAddress[];
let owner: SignerWithAddress;
let stranger: SignerWithAddress;

let ProxyAccess: ContractFactory;
let proxyAccessIns: Contract;

let hashRole = ethers.utils.keccak256(
	ethers.utils.toUtf8Bytes("EXCHANGE_ROLE")
);

describe("# ProxyAccess", () => {
	before(async () => {
		// signers
		signers = await ethers.getSigners();
		owner = signers[1];
		stranger = signers[5];
		// contract
		ProxyAccess = await ethers.getContractFactory(
			contractFactory.MockProxyAccess
		);
	});

	beforeEach(async () => {
		proxyAccessIns = await ProxyAccess.connect(owner).deploy();
		await proxyAccessIns.deployed();
	});

	describe("grant access", () => {
		let approvedSigner: SignerWithAddress;
		let proxyAccessInsFromOwner: Contract;
		let tx1: any;

		beforeEach(async () => {
			approvedSigner = signers[6];
			proxyAccessInsFromOwner = proxyAccessIns.connect(owner);
			// grant tx
			tx1 = await proxyAccessInsFromOwner.grantAccess(
				hashRole,
				approvedSigner.address
			);
		});

		it("should allow owner to grant access", async () => {
			await expect(tx1)
				.to.emit(proxyAccessInsFromOwner, "GrantAccess")
				.withArgs(hashRole, approvedSigner.address);
		});

		it("should an address has access after granting", async () => {
			await tx1.wait();

			expect(
				await proxyAccessInsFromOwner
					.connect(approvedSigner)
					.hasAccess(hashRole)
			).to.be.equal(true);
		});
	});

	it("should NOT allow non-owner to grant access", async () => {
		// connect
		const proxyAccessInsFromStranger = proxyAccessIns.connect(stranger);

		// grant access
		const tx = proxyAccessInsFromStranger.grantAccess(
			hashRole,
			signers[3].address
		);

		await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
	});

	describe("revoke access", () => {
		let approvedSigner: SignerWithAddress;
		let proxyAccessInsFromOwner: Contract;

		beforeEach(async () => {
			approvedSigner = signers[4];
			proxyAccessInsFromOwner = proxyAccessIns.connect(owner);
			// grant access
			await (
				await proxyAccessInsFromOwner.grantAccess(
					hashRole,
					approvedSigner.address
				)
			).wait();
		});
		it("should NOT allow non-owner to revoke access", async () => {
			// connect
			const proxyAccessInsFromStranger = proxyAccessIns.connect(stranger);

			// revoke access
			const tx = proxyAccessInsFromStranger.revokeAccess(
				hashRole,
				approvedSigner.address
			);

			await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
		});

		it("should allow owner to revoke access", async () => {
			// revoke access
			const tx = await proxyAccessInsFromOwner.revokeAccess(
				hashRole,
				approvedSigner.address
			);

			await expect(tx)
				.to.emit(proxyAccessInsFromOwner, "RevokeAccess")
				.withArgs(hashRole, approvedSigner.address);
		});
	});
});
