export interface IItemMetadataModel {
  thumbLink: string;
  description: string;
  name: string;
  properties: {
    type: string;
    name: string;
  }[];
}

export interface IItemModel {
  thumbLink: string;
  name: string;
  token: string; // collection address
  tokenId: string; // item id in collection
  collectionName: string;
  price: string;
  creator?: string;
  owner: string; // seller address
  ownerDisplay: string;
  ipfsUrl: string;
  metadata?: IItemMetadataModel;
  status: string;
  endAt: string;
}
