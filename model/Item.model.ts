import { BigNumber } from "ethers";

export interface IItemMetadataModel {
    imageUrl: string,
    description: string,
    name: string,
    attributes: [{
        trait: string,
        value: string,
    }],
}

export interface IItemModel {
    thumbLink: string,
    name: string,
    token: string,// collection address
    tokenId: string,
    collectionName: string
    price: string,
    creator?: string,
    owner: string,
    ipfsUrl?: string,
    metadata: IItemMetadataModel,
    status: string,
}



