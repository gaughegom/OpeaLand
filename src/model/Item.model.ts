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
    tokenId: string, // item id in collection
    collectionName: string
    price: string,
    creator?: string,
    owner: string, // seller
    ownerDisplay: string,
    ipfsUrl: string,
    metadata: IItemMetadataModel,
    status: string,
    endAt: string,
}



