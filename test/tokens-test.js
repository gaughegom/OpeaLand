const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenlandCollection", () => {
	let OpenlandCollectible;
	let OpenlandExchange;
	let OpenlandTrade;
	let collect1;
	let collect2;
	let trade;
	let exchange;
	let signer0;
	let signer1;
	let accounts;

	beforeEach(async () => {
		OpenlandCollectible = await ethers.getContractFactory(
			"OpenlandCollectible"
		);
		OpenlandTrade = await ethers.getContractFactory("OpenlandTokenTradable");
		OpenlandExchange = await ethers.getContractFactory("OpenlandExchange");

		trade = await (await OpenlandTrade.deploy()).deployed();
		exchange = await (await OpenlandExchange.deploy(trade.address)).deployed();
		collect1 = await (
			await OpenlandCollectible.deploy("test 1", "t1", trade.address)
		).deployed();
		collect2 = await (
			await OpenlandCollectible.deploy("test 2", "t2", trade.address)
		).deployed();

		//user
		signer0 = await ethers.getSigner(0);
		signer1 = await ethers.getSigner(1);

		//accounts
		accounts = await ethers.getSigners();
	});

	it("Should deploy 2 collections and test tokens minted", async () => {
		//mint tokens
		const tx1 = await collect1.mintTo(signer0.address);
		const tx2 = await collect1.mintTo(signer0.address);
		await tx1.wait();
		await tx2.wait();

		const tx3 = await collect2.mintTo(signer0.address);
		await tx3.wait();

		// check all token count collection 1
		expect((await collect1.totalSupply()).toNumber()).to.equal(2);
		expect((await collect1.tokensOfOwner(signer0.address)).length).to.equal(2);
		expect((await collect2.totalSupply()).toNumber()).to.equal(1);
	});

	it("Should mint and buy some token", async () => {
		//mint tokens
		const tx1 = await collect1.mintTo(signer0.address);
		const tx2 = await collect1.mintTo(signer0.address);
		await tx1.wait();
		await tx2.wait();

		//save token to storage
		const tx3 = await trade.saveTokenData(
			collect1.address,
			1,
			ethers.utils.parseUnits("10", "ether")
		);
		await tx3.wait();

		// open trade token
		const tx4 = await trade.openTrade(collect1.address, 1);
		await tx4.wait();

		let exchangeAsSigner1 = exchange.connect(signer1);

		// buy token
		const tx5 = await exchangeAsSigner1.exchange(collect1.address, 1, {
			value: ethers.utils.parseUnits("610", "ether"),
		});
		await tx5.wait();

		let ownerOfToken1 = await collect1.ownerOf(1);
		expect(ownerOfToken1).to.equal(signer1.address);
	});
});
