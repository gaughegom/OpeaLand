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
let proxyAccess: SignerWithAddress;
let ERC721Land: ContractFactory;
let erc721LandIns: Contract;

let hashRole = ethers.utils.keccak256(
	ethers.utils.toUtf8Bytes("TRANSFER_ROLE")
);

describe("# ERC721Land", () => {
	before(async () => {
		// signers
		signers = await ethers.getSigners();
		owner = signers[0];
		stranger = signers[5];
		proxyAccess = signers[3];

		// contract
		ERC721Land = await ethers.getContractFactory(contractFactory.ERC721Land);
	});

	beforeEach(async () => {
		erc721LandIns = await ERC721Land.connect(owner).deploy(
			"Test land contract",
			"TLC",
			proxyAccess.address
		);
		await erc721LandIns.deployed();
	});

	it("should erc721 contract belong to owner", async () => {
		expect(await erc721LandIns.owner()).to.be.equal(owner.address);
	});

	it("should has proxy access", async () => {
		expect(
			await erc721LandIns.connect(proxyAccess).hasAccess(hashRole)
		).to.be.equal(true);
	});

	it("should allow owner to mint token", async () => {
		// connect owner
		const erc721LandInsFromOwner = erc721LandIns.connect(owner);
		// mint tx
		const tx1 = await erc721LandInsFromOwner.mint(
			owner.address,
			"ipfs://test.com"
		);
		await tx1.wait();

		expect(await erc721LandInsFromOwner.ownerOf(1)).to.be.equal(owner.address);
	});

	it("should NOT allow non-owner to mint token", async () => {
		// connect stranger
		const erc721LandInsFromStranger = erc721LandIns.connect(stranger);
		// mint tx
		const tx1 = erc721LandInsFromStranger.mint(
			owner.address,
			"ipfs://test.com"
		);

		await expect(tx1).to.be.revertedWith("Ownable: caller is not the owner");
	});

	it("should return token uri", async () => {
		const tx = await erc721LandIns
			.connect(owner)
			.mint(owner.address, "ipfs://test.com");
		await tx.wait();

		expect(await erc721LandIns.tokenUri(1)).to.be.equal("ipfs://test.com");
	});
});
