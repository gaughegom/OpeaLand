import "@nomiclabs/hardhat-waffle";
import { ethers } from "ethers";
import { task } from "hardhat/config";
import { contractFactory } from "../utils";
import { getAccount } from "./helper";

task(
  "accounts",
  "Print the list of accounts in dev env",
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    accounts.map((e) => console.log(e.address));
  }
);

task("deploy-migrate", "Test deploy a migration contract").setAction(
  async function (taskArgs, hre) {
    const MigrationContract = await hre.ethers.getContractFactory(
      contractFactory.Migration,
      getAccount()
    );
    const migrationIns = await MigrationContract.deploy();
    await migrationIns.deployed();

    console.log(`Migration contract deploy to: ${migrationIns.address}`);
  }
);

task("deploy", "Deploy contract on chain").setAction(async function (
  taskArgs,
  hre
) {
  const host = getAccount();
  const HolderFactory = await hre.ethers.getContractFactory(
    contractFactory.Holder,
    host
  );
  const TransferProxyFactory = await hre.ethers.getContractFactory(
    contractFactory.TransferProxy,
    host
  );
  const ExchangeSellFactory = await hre.ethers.getContractFactory(
    contractFactory.ExchangeSell,
    host
  );
  const ExchangeAuctionFactory = await hre.ethers.getContractFactory(
    contractFactory.ExchangeAuction,
    host
  );
  const ExchangeFactory = await hre.ethers.getContractFactory(
    contractFactory.Exchange,
    host
  );
  const ERC721LandFactory = await hre.ethers.getContractFactory(
    contractFactory.ERC721Land,
    host
  );
  const ERC721DefaultFactory = await hre.ethers.getContractFactory(
    contractFactory.ERC721Default,
    host
  );

  // deploy transferProxy contract
  const transferProxyIns = await TransferProxyFactory.connect(host).deploy();
  // deploy holder contract
  const holderIns = await HolderFactory.connect(host).deploy();
  await transferProxyIns.deployed();
  await holderIns.deployed();

  console.log(`transferProxy: ${transferProxyIns.address}`);
  console.log(`holder: ${holderIns.address}`);

  // deploy default collection
  const erc721Ins = await ERC721LandFactory.connect(host).deploy(
    "Openland Collection NFT",
    "OCN",
    transferProxyIns.address
  );
  await erc721Ins.deployed();
  const erc721DefaultIns = await ERC721DefaultFactory.connect(host).deploy();
  await erc721DefaultIns.deployed();
  // transfer & set default
  await (await erc721Ins.transferOwnership(erc721DefaultIns.address)).wait();
  await (await erc721DefaultIns.setDefault(erc721Ins.address)).wait();

  console.log(`erc721: ${erc721Ins.address}`);
  console.log(`erc721Default: ${erc721DefaultIns.address}`);

  // deploy exchangeSell contract
  const exchangeSellIns = await ExchangeSellFactory.connect(host).deploy(
    transferProxyIns.address,
    holderIns.address
  );
  await exchangeSellIns.deployed();
  // deploy exchangeAuction contract
  const exchangeAuctionIns = await ExchangeAuctionFactory.connect(host).deploy(
    transferProxyIns.address,
    holderIns.address
  );
  await exchangeAuctionIns.deployed();

  // deploy exchange contract
  const exchangeIns = await ExchangeFactory.connect(host).deploy(
    exchangeAuctionIns.address,
    exchangeSellIns.address,
    holderIns.address
  );
  await exchangeIns.deployed();

  console.log(`exchangeSell: ${exchangeSellIns.address}`);
  console.log(`exchangeAuction: ${exchangeAuctionIns.address}`);
  console.log(`exchange: ${exchangeIns.address}`);

  // add operators
  await (
    await transferProxyIns.connect(host).add(exchangeSellIns.address)
  ).wait();
  await (
    await transferProxyIns.connect(host).add(exchangeAuctionIns.address)
  ).wait();

  // grant access holder
  const exchangeRole = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("EXCHANGE_ROLE")
  );
  await (
    await holderIns
      .connect(host)
      .grantAccess(exchangeRole, exchangeSellIns.address)
  ).wait();
  await (
    await holderIns
      .connect(host)
      .grantAccess(exchangeRole, exchangeAuctionIns.address)
  ).wait();
});
