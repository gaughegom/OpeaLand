import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract, ContractFactory } from "ethers";
import { contractFactory } from "../utils";
import { mintERC721Token } from "./utils/mintToken";
import { addOwnableOperatorRole } from "./utils/operatorRole";
import { AssetAuction, AssetSell, AssetType } from "../model/Asset.model";

// signers
let signers: SignerWithAddress[];
let owner: SignerWithAddress;
let stranger: SignerWithAddress;
let minter: SignerWithAddress;

// contracts
let MockExchange: ContractFactory;
let Holder: ContractFactory;
let TransferProxy: ContractFactory;
let ExchangeSell: ContractFactory;
let ExchangeAuction: ContractFactory;
let ERC721Land: ContractFactory;
let mockExchangeIns: Contract;
let holderIns: Contract;
let transferProxyIns: Contract;
let exchangeSellIns: Contract;
let exchangeAuctionIns: Contract;
let erc721LandIns: Contract;

before(async () => {
	signers = await ethers.getSigners();
	owner = signers[0];
	stranger = signers[6];
	MockExchange = await ethers.getContractFactory(
		contractFactory.MockExchangeCore
	);
});

describe("# ExchangeCore", () => {
	let tx: any;
	beforeEach(async () => {
		// deployed
		mockExchangeIns = await MockExchange.connect(owner).deploy();
		await mockExchangeIns.deployed();
		// send eth
		tx = await owner.sendTransaction({
			to: mockExchangeIns.address,
			value: ethers.utils.parseEther("11")
		});
	});

	it("should allow contract receive eth", async () => {
		const contractBalance = await mockExchangeIns.balance();
		expect(contractBalance).to.be.equal(
			BigNumber.from(ethers.utils.parseEther("11"))
		);
		expect(tx)
			.to.be.emit(mockExchangeIns, "Receive")
			.withArgs(contractBalance, owner.address);
	});

	it("should allow owner to withdraw", async () => {
		tx = await mockExchangeIns
			.connect(owner)
			.withdraw(ethers.utils.parseEther("5"));
		await tx.wait();

		expect(await mockExchangeIns.balance()).to.be.equal(
			BigNumber.from(ethers.utils.parseEther("6"))
		);
		expect(tx)
			.to.be.emit(mockExchangeIns, "Withdraw")
			.withArgs(ethers.utils.parseEther("5"), owner.address);
	});

	it("should NOT allow non-owner to withdraw", async () => {
		tx = mockExchangeIns
			.connect(stranger)
			.withdraw(ethers.utils.parseEther("5"));

		await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
	});

	it("should NOT allow to withdraw amount > balance", async () => {
		tx = mockExchangeIns.connect(owner).withdraw(ethers.utils.parseEther("20"));

		await expect(tx).to.be.revertedWith(
			"ExchangeCore#withdraw: amount must be lesser than balance"
		);
	});
});

describe("# ExchangeSell", () => {
	const exchangeRole = ethers.utils.keccak256(
		ethers.utils.toUtf8Bytes("EXCHANGE_ROLE")
	);
	let asset: AssetSell;

	before(async () => {
		minter = signers[4];
		Holder = await ethers.getContractFactory(contractFactory.Holder);
		TransferProxy = await ethers.getContractFactory(
			contractFactory.TransferProxy
		);
		ExchangeSell = await ethers.getContractFactory(
			contractFactory.ExchangeSell
		);
		ERC721Land = await ethers.getContractFactory(contractFactory.ERC721Land);
	});

	beforeEach(async () => {
		// deployed
		transferProxyIns = await TransferProxy.connect(owner).deploy();
		holderIns = await Holder.connect(owner).deploy();
		await transferProxyIns.deployed();
		await holderIns.deployed();
		erc721LandIns = await ERC721Land.connect(minter).deploy(
			"Test Exchange Token",
			"TET",
			transferProxyIns.address
		);
		exchangeSellIns = await ExchangeSell.connect(owner).deploy(
			transferProxyIns.address,
			holderIns.address
		);
		// mint token
		await mintERC721Token(
			erc721LandIns.connect(minter),
			minter.address,
			"ipfs://test.com"
		);
		// add operator
		await addOwnableOperatorRole([transferProxyIns], exchangeSellIns, owner);
		// grant access  holder
		await (
			await holderIns
				.connect(owner)
				.grantAccess(exchangeRole, exchangeSellIns.address)
		).wait();
		// init asset obj
		asset = new AssetSell(
			erc721LandIns,
			minter.address,
			BigNumber.from(1),
			BigNumber.from(ethers.utils.parseEther("2"))
		);
	});

	describe("list & delist asset token", () => {
		it("should allow owner of token list asset", async () => {
			const tx = await exchangeSellIns
				.connect(minter)
				.list(asset.domain.token, asset.domain.tokenId, asset.price);
			await tx.wait();

			expect(await erc721LandIns.ownerOf(1)).to.be.equal(holderIns.address);
			expect(tx)
				.to.be.emit(exchangeSellIns, "ListAsset")
				.withArgs(asset.domain.token, asset.domain.tokenId);
			expect(
				(await exchangeSellIns.assetsSell(asset.bytes32HashKey)).price
			).to.be.equal(asset.price);
		});

		it("should NOT allow non-owner of token list asset", async () => {
			const tx = exchangeSellIns
				.connect(stranger)
				.list(asset.domain.token, asset.domain.tokenId, asset.price);

			await expect(tx).to.be.revertedWith(
				"ExchangeSell#_validateOwnerOfToken: caller must be owner of token"
			);
		});

		it("should NOT allow to list asset with too low price", async () => {
			asset.price = BigNumber.from(ethers.utils.parseEther("0.00000001"));
			const tx = exchangeSellIns
				.connect(minter)
				.list(asset.domain.token, asset.domain.tokenId, asset.price);

			await expect(tx).to.be.revertedWith(
				"ExchangeSell#list: asset price is too low"
			);
		});
	});

	describe("allow to purchase", () => {
		let buyer: SignerWithAddress;
		let tx: any;
		beforeEach(async () => {
			// list asset
			await (
				await exchangeSellIns
					.connect(minter)
					.list(asset.domain.token, asset.domain.tokenId, asset.price)
			).wait();
			buyer = signers[7];
			tx = await exchangeSellIns
				.connect(buyer)
				.purchase(asset.bytes32HashKey, { value: asset.price });
			await tx.wait();
		});

		it("should asset token belongs to buyer", async () => {
			expect(await erc721LandIns.ownerOf(asset.domain.tokenId)).to.be.equal(
				buyer.address
			);
		});

		it("should exchange contract receive eth", async () => {
			expect(await exchangeSellIns.balance()).to.be.equal(
				ethers.utils.parseEther("0.0005")
			);
		});

		it("should emit event Purchase", async () => {
			expect(tx)
				.to.be.emit(exchangeSellIns, "Purchase")
				.withArgs(asset.bytes32HashKey, buyer.address, asset.price);
		});

		it("should asset in NUll state after purchasing", async () => {
			expect(await holderIns.get(asset.bytes32HashKey)).to.be.equal(
				AssetType.NULL
			);
		});
	});

	it("should NOT allow to purchase with insufficient bid value", async () => {
		const buyer = signers[7];
		const amount = asset.price.toBigInt() - BigNumber.from("10000").toBigInt();
		// list asset
		await (
			await exchangeSellIns
				.connect(minter)
				.list(asset.domain.token, asset.domain.tokenId, asset.price)
		).wait();
		// execute tx
		const tx = exchangeSellIns
			.connect(buyer)
			.purchase(asset.bytes32HashKey, { value: amount });

		await expect(tx).to.be.revertedWith(
			"ExchangeSell#purchase: insufficient value"
		);
	});

	it("should NOT allow to purchase an unlisted asset token", async () => {
		const buyer = signers[7];
		const tx = exchangeSellIns
			.connect(buyer)
			.purchase(asset.bytes32HashKey, { value: asset.price });

		await expect(tx).to.be.revertedWith(
			"ExchangeSell#delist: asset is not listed"
		);
	});
});

describe("# ExchangeAuction", () => {
	const exchangeRole = ethers.utils.keccak256(
		ethers.utils.toUtf8Bytes("EXCHANGE_ROLE")
	);
	let asset: AssetAuction;

	before(async () => {
		Holder = await ethers.getContractFactory(contractFactory.Holder);
		TransferProxy = await ethers.getContractFactory(
			contractFactory.TransferProxy
		);
		ERC721Land = await ethers.getContractFactory(contractFactory.ERC721Land);
		ExchangeAuction = await ethers.getContractFactory(
			contractFactory.ExchangeAuction
		);
	});

	beforeEach(async () => {
		minter = signers[4];
		// deployed
		transferProxyIns = await TransferProxy.connect(owner).deploy();
		holderIns = await Holder.connect(owner).deploy();
		await transferProxyIns.deployed();
		await holderIns.deployed();
		erc721LandIns = await (
			await ERC721Land.connect(minter).deploy(
				"Test Exchange Token",
				"TET",
				transferProxyIns.address
			)
		).deployed();
		exchangeAuctionIns = await (
			await ExchangeAuction.connect(owner).deploy(
				transferProxyIns.address,
				holderIns.address
			)
		).deployed();
		// mint token
		await mintERC721Token(
			erc721LandIns.connect(minter),
			minter.address,
			"ipfs://test.com"
		);
		// add operator
		await addOwnableOperatorRole([transferProxyIns], exchangeAuctionIns, owner);
		// grant access  holder
		await (
			await holderIns
				.connect(owner)
				.grantAccess(exchangeRole, exchangeAuctionIns.address)
		).wait();
		// init asset obj
		asset = new AssetAuction(
			erc721LandIns,
			minter.address,
			BigNumber.from(1),
			BigNumber.from(ethers.utils.parseEther("0.01")),
			BigNumber.from(0)
		);
	});

	describe("start auction", () => {
		let tx: any;
		beforeEach(async () => {
			asset.endTime = BigNumber.from(3);
			tx = await exchangeAuctionIns
				.connect(minter)
				.start(
					asset.domain.token,
					asset.domain.tokenId,
					asset.startPrice,
					asset.endTime
				);
			await tx.wait();
		});

		it("should asset in auctions", async () => {
			const auction = await exchangeAuctionIns.assetsAuction(
				asset.bytes32HashKey
			);
			expect(auction.domain.token).to.be.equal(asset.domain.token);
			expect(auction.domain.seller).to.be.equal(minter.address);
			expect(auction.startPrice).to.be.equal(asset.startPrice);
		});

		it("should emit StartAuction event", async () => {
			await expect(tx)
				.to.be.emit(exchangeAuctionIns, "StartAuction")
				.withArgs(asset.bytes32HashKey);
		});

		it("should asset in holder", async () => {
			const assetType = await holderIns.get(asset.bytes32HashKey);
			expect(assetType).to.be.equal(AssetType.Auction);
		});

		it("should allow to bid asset auction", async () => {
			const bidder = signers[8];
			const bidAmount =
				asset.startPrice.toBigInt() + ethers.utils.parseEther("0.5").toBigInt();
			const tx = await exchangeAuctionIns
				.connect(bidder)
				.bid(asset.bytes32HashKey, {
					value: bidAmount
				});

			await tx.wait();

			const auctionParam = await exchangeAuctionIns.auctionsParam(
				asset.bytes32HashKey
			);
			expect(auctionParam.highestBid).to.be.equal(bidAmount);
			expect(auctionParam.highestBidder).to.be.equal(bidder.address);
		});

		it("should calc old bid value", async () => {
			const bidder = signers[7];
			const preAmount = asset.startPrice.toBigInt();
			const addAmount = ethers.utils.parseEther("0.001");

			await (
				await exchangeAuctionIns
					.connect(bidder)
					.bid(asset.bytes32HashKey, { value: preAmount })
			).wait();

			const tx = await exchangeAuctionIns
				.connect(bidder)
				.bid(asset.bytes32HashKey, { value: addAmount });
			await tx.wait();

			const auctionParam = await exchangeAuctionIns.auctionsParam(
				asset.bytes32HashKey
			);
			expect(auctionParam.highestBid).to.be.equal(
				preAmount + addAmount.toBigInt()
			);
		});

		it("should NOT allow to bid with value is lower than start price", async () => {
			const bidder = signers[8];
			const amount =
				asset.startPrice.toBigInt() -
				ethers.utils.parseEther("0.01").toBigInt();
			const tx = exchangeAuctionIns
				.connect(bidder)
				.bid(asset.bytes32HashKey, { value: amount });

			await expect(tx).to.be.revertedWith(
				"ExchangeAuction: bid value is lower than start price"
			);
		});

		it("should NOT allow to bid with value is lower than highest bid", async () => {
			const bidder1 = signers[7];
			const bidder2 = signers[8];
			const amount1 =
				asset.startPrice.toBigInt() +
				ethers.utils.parseEther("0.01").toBigInt();
			const amount2 =
				asset.startPrice.toBigInt() +
				ethers.utils.parseEther("0.0001").toBigInt();

			await (
				await exchangeAuctionIns
					.connect(bidder1)
					.bid(asset.bytes32HashKey, { value: amount1 })
			).wait();
			const tx = exchangeAuctionIns
				.connect(bidder2)
				.bid(asset.bytes32HashKey, { value: amount2 });

			await expect(tx).to.be.revertedWith(
				"ExchangeAuction: bid value is lower than the highest price"
			);
		});

		it("should NOT allow to bid when auction time is ended", async () => {
			const bidder = signers[8];
			const amount =
				asset.startPrice.toBigInt() +
				ethers.utils.parseEther("0.0001").toBigInt();

			// sleep 4s
			await new Promise((resolve) => setTimeout(resolve, 4000));

			const tx = exchangeAuctionIns
				.connect(bidder)
				.bid(asset.bytes32HashKey, { value: amount });
			await expect(tx).to.be.revertedWith("ExchangeAuction: auction is ended");
		});
	});

	describe("end auction", () => {
		beforeEach(async () => {
			// init asset endTime
			asset.endTime = BigNumber.from(3);
			// start auction
			await (
				await exchangeAuctionIns
					.connect(minter)
					.start(
						asset.domain.token,
						asset.domain.tokenId,
						asset.startPrice,
						asset.endTime
					)
			).wait();
		});

		it("should allow transfer to seller when no-one bid", async () => {
			// sleep 4s
			await new Promise((resolve) => setTimeout(resolve, 4000));
			// end auction
			const tx = await exchangeAuctionIns
				.connect(minter)
				.end(asset.domain.token, asset.domain.tokenId);

			await tx.wait();

			expect(tx)
				.to.emit(exchangeAuctionIns, "EndAuction")
				.withArgs(asset.bytes32HashKey);
			expect(await erc721LandIns.ownerOf(asset.domain.tokenId)).to.be.equal(
				minter.address
			);
		});

		it("should allow transfer to highest bidder", async () => {
			// bid
			const bidder = signers[8];
			const bidAmount =
				asset.startPrice.toBigInt() +
				ethers.utils.parseEther("0.01").toBigInt();
			await (
				await exchangeAuctionIns
					.connect(bidder)
					.bid(asset.bytes32HashKey, { value: bidAmount })
			).wait();
			// sleep 4s
			await new Promise((resolve) => setTimeout(resolve, 4000));

			const tx = await exchangeAuctionIns
				.connect(minter)
				.end(asset.domain.token, asset.domain.tokenId);
			await tx.wait();

			expect(await erc721LandIns.ownerOf(asset.domain.tokenId)).to.be.equal(
				bidder.address
			);
		});
	});
});
