import { BigNumber, Contract } from "ethers";
import { hashBytes32Key } from "../utils";

export interface IAssetLibs {
	bytes32HashKey: string;
}

export interface IAssetDomain {
	token: string;
	seller: string;
	tokenId: BigNumber;
}

export interface IAssetSell {
	domain: IAssetDomain;
	price: BigNumber;
}

export enum AssetType {
	NULL,
	Sell,
	Auction
}

export class AssetSell implements IAssetSell, IAssetLibs {
	domain: IAssetDomain;
	price: BigNumber;
	bytes32HashKey: string;

	constructor(
		token: Contract,
		seller: string,
		tokenId: BigNumber,
		price: BigNumber
	) {
		this.domain = {
			token: token.address,
			seller: seller,
			tokenId: tokenId
		};
		this.price = price;
		this.bytes32HashKey = hashBytes32Key(this.domain);
	}
}

export class AssetAuction {}
