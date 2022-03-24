const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenlandCollection", () => {
	let trade;
	let exchange;
	let factory;
	let signer0;
	let signer1;
	let accounts;

	beforeEach(async () => {
		//user
		signer0 = await ethers.getSigner(0);
		signer1 = await ethers.getSigner(1);
		//accounts
		accounts = await ethers.getSigners();

		const OpenlandTrade = await ethers.getContractFactory(
			"OpenlandTokenTradable"
		);
		const OpenlandExchange = await ethers.getContractFactory(
			"OpenlandExchange"
		);
		const OpenlandFactory = await ethers.getContractFactory("OpenlandFactory");

		// deploy trade
		trade = await (await OpenlandTrade.deploy()).deployed();
		// deploy factory
		factory = await (await OpenlandFactory.deploy(trade.address)).deployed();
		// deploy exchange
		exchange = await (await OpenlandExchange.deploy(trade.address)).deployed();
	});

	it("Should create 1 collections and mint token with signer0", async () => {
		// create collection
		const collection1 = await (
			await factory.createCollection("test 1", "t1")
		).wait();
		const collection1Address = collection1.events[0].address;

		let collectible1 = await ethers.getContractAt(
			"OpenlandCollectible",
			collection1Address,
			signer0
		);
		let tx1 = await (await collectible1.mintTo(signer0.address)).wait();

		let ownerOfToken1 = await collectible1.ownerOf(1);
		expect(ownerOfToken1).to.equal(signer0.address);
		expect((await collectible1.totalSupply()).toNumber()).to.equal(1);
	});

	it("Should mint and buy token", async () => {
		const price = "100";

		// create collection
		const collection1 = await (
			await factory.createCollection("test 1", "t1")
		).wait();
		const collection1Address = collection1.events[0].address;

		// connect collection just created
		let collectible1 = await ethers.getContractAt(
			"OpenlandCollectible",
			collection1Address,
			signer0
		);

		// mint token and openTrade
		let tx1 = await (await collectible1.mintTo(signer0.address)).wait();
		let tx2 = await (await collectible1.approve(trade.address, 1)).wait();
		let tx3 = await (
			await trade.saveTokenData(
				collectible1.address,
				1,
				ethers.utils.parseEther(price)
			)
		).wait();
		let tx4 = await (await trade.openTrade(collectible1.address, 1)).wait();

		// connect exchange with signer1
		let exchangeSigner1 = exchange.connect(signer1);
		let tx5 = await (
			await exchangeSigner1.exchange(collectible1.address, 1, {
				value: ethers.utils.parseEther(price),
			})
		).wait();

		let ownerOfToken1 = await collectible1.ownerOf(1);
		expect(ownerOfToken1).to.equal(signer1.address);

		let token1Index = await trade.getTokenIndex(collectible1.address, 1);
		let token1 = await trade.tokenAtIndex(token1Index.toNumber());
		expect(token1.status).to.equal(0); //closed trade
	});

	it("Should mint and change token price", async () => {
		// create collection
		const collection1 = await (
			await factory.createCollection("test 1", "t1")
		).wait();
		const collection1Address = collection1.events[0].address;

		// attch collection
		let collectible1 = await ethers.getContractAt(
			"OpenlandCollectible",
			collection1Address,
			signer0
		);
		// mint tokenId 1
		let tx1 = await (await collectible1.mintTo(signer0.address)).wait();
		// approve tokenId 1
		let tx2 = await (await collectible1.approve(trade.address, 1)).wait();
		// save token data
		let tx3 = await (
			await trade.saveTokenData(
				collectible1.address,
				1,
				ethers.utils.parseEther("10")
			)
		).wait();

		// assert token1 price
		let token1 = await trade.tokenAtIndex(0);
		expect(token1.price).to.equal(ethers.utils.parseEther("10"));

		// change token1 price
		let tx4 = await (
			await trade.setTokenPrice(
				collectible1.address,
				1,
				ethers.utils.parseEther("50")
			)
		).wait();

		// assert token1 price again
		token1 = await trade.tokenAtIndex(0);
		expect(token1.price).to.equal(ethers.utils.parseEther("50"));
	});
});
