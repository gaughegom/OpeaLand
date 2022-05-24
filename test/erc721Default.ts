import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "@nomiclabs/hardhat-waffle";
import { Contract, ContractFactory } from "ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { contractFactory } from "../utils";

let signers: SignerWithAddress[];
let host: SignerWithAddress;
let stranger: SignerWithAddress;
let ERC721Land: ContractFactory;
let ERC721Default: ContractFactory;
let TransferProxy: ContractFactory;
let erc721LandIns: Contract;
let erc721DefaultIns: Contract;
let transferProxyIns: Contract;

before(async () => {
	signers = await ethers.getSigners();
	host = signers[0];
	stranger = signers[3];
	ERC721Land = await ethers.getContractFactory(contractFactory.ERC721Land);
	ERC721Default = await ethers.getContractFactory(
		contractFactory.ERC721Default
	);
	TransferProxy = await ethers.getContractFactory(
		contractFactory.TransferProxy
	);
});

describe("# ERC721Default", () => {
	beforeEach(async () => {
		transferProxyIns = await (await TransferProxy.deploy()).deployed();
		erc721LandIns = await (
			await ERC721Land.connect(host).deploy(
				"Test Default ERC",
				"TDE",
				transferProxyIns.address
			)
		).deployed();
		erc721DefaultIns = await (
			await ERC721Default.connect(host).deploy()
		).deployed();
		// transfer ownership erc721 to default
		await (
			await erc721LandIns.transferOwnership(erc721DefaultIns.address)
		).wait();
	});

	it("should allow stranger to mint token throw default contract", async () => {
		await (await erc721DefaultIns.setDefault(erc721LandIns.address)).wait();
		const tx = await erc721DefaultIns.connect(stranger).mint("ipfs://test.com");
		await tx.wait();
		expect(await erc721LandIns.ownerOf(1)).to.be.equal(stranger.address);
	});
});
