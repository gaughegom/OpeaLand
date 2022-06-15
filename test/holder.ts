import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { contractFactory } from "../utils";
import { AssetType } from "../src/model/Asset.model";

// signers
let signers: SignerWithAddress[];
let owner: SignerWithAddress;
let accessCaller: SignerWithAddress;
let stranger: SignerWithAddress;
// contracts
let Holder: ContractFactory;
let holderIns: Contract;

const accessRole = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("EXCHANGE_ROLE")
);

const fakeHashAsset = ethers.utils.solidityKeccak256(
  ["address", "uint256"],
  ["0x495f947276749Ce646f68AC8c248420045cb7b5e", "1"]
);

before(async () => {
  signers = await ethers.getSigners();
  owner = signers[1];
  accessCaller = signers[3];
  stranger = signers[6];
  Holder = await ethers.getContractFactory(contractFactory.Holder);
});

describe("# Holder", () => {
  beforeEach(async () => {
    holderIns = await Holder.connect(owner).deploy();
    await holderIns.deployed();
    // give access
    await (
      await holderIns
        .connect(owner)
        .grantAccess(accessRole, accessCaller.address)
    ).wait();
  });

  it("should allow accessCaller to set asset state", async () => {
    const tx = await holderIns
      .connect(accessCaller)
      .set(fakeHashAsset, AssetType.Sell);
    await tx.wait();
    expect(await holderIns.assetTypes(fakeHashAsset)).to.be.equal(
      AssetType.Sell
    );
  });

  it("should NOT allow non-access to set asset state", async () => {
    const tx = holderIns
      .connect(stranger)
      .set(fakeHashAsset, AssetType.Auction);

    await expect(tx).to.be.revertedWith("ProxyAccess: caller not have access");
  });

  it("should get asset state", async () => {
    await (
      await holderIns
        .connect(accessCaller)
        .set(fakeHashAsset, AssetType.Auction)
    ).wait();
    expect(await holderIns.get(fakeHashAsset)).to.be.equal(AssetType.Auction);
  });
});
