const { expect } = require("chai");
const { ethers } = require("hardhat");

const { TokenStatus } = require("./utils/common");

describe("Default collection of web", () => {
	let signer0;
	let signer1;
	let tradeContract;
	let factoryContract;
	let Collectible;

	beforeEach(async () => {
		// signers
		signer0 = await ethers.getSigner(0);
		signer1 = await ethers.getSigner(1);

		// Abi
		const Factory = await ethers.getContractFactory("OpenlandFactory");
		const Tradeable = await ethers.getContractFactory("OpenlandTokenTradable");
		Collectible = await ethers.getContractFactory("OpenlandCollectible");

		// deloy tradable
		tradeContract = await (await Tradeable.deploy()).deployed();
		// deploy factory
		factoryContract = await (
			await Factory.deploy(tradeContract.address)
		).deployed();
	});

	it("Should create default collection own by factory", async () => {
		// deploy default collection
		let defaultCollect = await (
			await Collectible.deploy("test default", "td", factoryContract.address)
		).deployed();
		expect(factoryContract.address).to.equal(
			(await defaultCollect.owner()).toString()
		);

		// set default collection
		await (
			await factoryContract.setDefaultCollection(defaultCollect.address)
		).wait();

		// assert owner of defaultCollection
		expect(factoryContract.address).to.equal(
			(await defaultCollect.owner()).toString()
		);

		// mint token with defaultCollection
		let factoryAsSigner1 = factoryContract.connect(signer1);
		let tx1 = await (await factoryContract.mintToken()).wait();
		let tx2 = await (await factoryAsSigner1.mintToken()).wait();

		// assert owner of token
		expect(signer0.address).to.equal(
			(await defaultCollect.ownerOf(1)).toString()
		);
		expect(signer1.address).to.equal(
			(await defaultCollect.ownerOf(2)).toString()
		);

		// save token data to storage
		let tradaAsSigner1 = tradeContract.connect(signer1);
		let tx3 = await (
			await tradaAsSigner1.saveTokenData(
				defaultCollect.address,
				2,
				ethers.utils.parseEther("100")
			)
		).wait();

		// get token of signer1 in storage
		let tokenOfSig1Index = await tradeContract.getTokenIndex(
			defaultCollect.address,
			2
		);
		let tokenOfSig1 = await tradeContract.tokenAtIndex(
			tokenOfSig1Index.toNumber()
		);

		// assert status
		expect(tokenOfSig1.status).to.equal(TokenStatus.CLOSED);
	});
});
