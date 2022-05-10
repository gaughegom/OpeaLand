import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract, ContractFactory } from "ethers";
import { contractFactory } from "../utils";
import { IAssetDomain } from "../model/Asset.model";

let signers: SignerWithAddress[];
let owner: SignerWithAddress;

let MockHash: ContractFactory;
let mockHashIns: Contract;

const token: string = "0xE0f5206BBD039e7b0592d8918820024e2a7437b9";
const tokenId: BigNumber = BigNumber.from(1);

let assetDomain: IAssetDomain;

const hashKey = ethers.utils.solidityKeccak256(
	["address", "uint256"],
	[token, tokenId.toString()]
);

describe("# MockHashAsset", () => {
	before(async () => {
		signers = await ethers.getSigners();
		owner = signers[1];

		MockHash = await ethers.getContractFactory(contractFactory.MockHashAsset);

		assetDomain = {
			token,
			tokenId,
			seller: owner.address
		};
	});

	beforeEach(async () => {
		mockHashIns = await MockHash.connect(owner).deploy();
		await mockHashIns.deployed();
	});

	it("should hash token & tokenId", async () => {
		expect(
			await mockHashIns.hashKeyWithToken(token, tokenId.toString())
		).to.be.equal(hashKey);
	});

	it("should hash sell asset", async () => {
		expect(await mockHashIns.hashKeyWithDomain(assetDomain)).to.be.equal(
			hashKey
		);
	});
});
