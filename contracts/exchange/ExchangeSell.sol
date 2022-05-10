// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "./Holder.sol";
import "./ExchangeCore.sol";
import "./domain/ExchangeDomain.sol";
import "../proxy/TransferProxy.sol";
import "../libs/HashAsset.sol";


contract ExchangeSell is ExchangeCore {
	mapping (bytes32 => ExchangeDomain.AssetSell) public assetsSell;

	uint256 public constant LOWEST_PRICE = 0.001 ether;
	uint256 public constant TX_FEE = 0.0005 ether;

	TransferProxy public transferProxy;
	Holder public holder;

	event ListAsset(address indexed token, uint256 indexed tokenId);
	event DelistAsset(address indexed token, uint256 indexed tokenId);
	event Purchase(bytes32 assetKey, address buyer, uint256 amount);

	/**
		Init this contract with transferProxy & holder
	 */
	constructor(address _transfer, address _holder) 
	{
		transferProxy = TransferProxy(_transfer);
		holder = Holder(_holder);
	}

	/**
		@dev List a asset token
		@notice When listing success, token is transfered to holder
	 */
	function list(address token, uint256 tokenId, uint256 price) external 
	{
		IERC721 erc721 = IERC721(token);
		// validate
		address ownerOfToken = _validateOwnerOfToken(erc721, tokenId);
		require(price >= LOWEST_PRICE, "ExchangeSell#list: asset price is too low");

		bytes32 assetKey = HashAsset.hashKey(token, tokenId);
		ExchangeDomain.AssetSell memory asset = assetsSell[assetKey];

		// add assetSell
		assetsSell[assetKey] = _prepareAssetInfo(asset, token, tokenId, price);

		// transfer to holder
		transferProxy.erc721SafeTransfer(
			erc721,
			ownerOfToken,
			address(holder),
			tokenId);
		holder.set(assetKey, ExchangeState.AssetType.Sell);

		emit ListAsset(asset.domain.token, asset.domain.tokenId);
	}

	/**
		@dev Remove an asset token from market
		Return token from owner to seller
		Caller MUST be seller
	 */
	function delist(address token, uint256 tokenId) external 
	{
		bytes32 assetKey = HashAsset.hashKey(token, tokenId);
		_requireAvailable(assetKey);

		// redeem from holder
		transferProxy.erc721SafeTransfer(
			IERC721(token),
			address(holder),
			_msgSender(),
			tokenId);
		holder.set(assetKey, ExchangeState.AssetType.NULL);

		emit DelistAsset(token, tokenId);
	}

	/**
		@dev Allow other to buy an asset token on market
		@notice Token must be listed in holder
		Bid value must be greater than asset price
		When a purchase tx success, a fee will be given to this contract from asset selling price.
	 */
	function purchase(bytes32 assetKey) external payable
	{
		_requireAvailable(assetKey);
		ExchangeDomain.AssetSell memory asset = assetsSell[assetKey];
		require(msg.value >= asset.price, "ExchangeSell#purchase: insufficient value");

		(bool transferFee, ) = payable(address(this)).call{value: TX_FEE}("");
		require(transferFee, "ExchangeSell#purchase: transfer fee failed");
		(bool transferValue, ) = asset.domain.seller.call{value: msg.value - TX_FEE}("");
		require(transferValue, "ExchangeSell#purchase: transfer failed");

		// transfer asset token to buyer
		transferProxy.erc721SafeTransfer(
			IERC721(asset.domain.token),
			address(holder),
			_msgSender(),
			asset.domain.tokenId);

		// delist token
		holder.set(assetKey, ExchangeState.AssetType.NULL);

		emit Purchase(assetKey, _msgSender(), msg.value);
	}

	function _prepareAssetInfo(
		ExchangeDomain.AssetSell memory asset,
		address token,
		uint256 tokenId,
		uint256 price
	) internal view returns(ExchangeDomain.AssetSell memory) 
	{
		if (asset.domain.token == address(0)) {
			asset.domain.token = token;
			asset.domain.tokenId = tokenId;
		}
		asset.domain.seller = payable(_msgSender());
		asset.price = price;

		return asset;
	}

	function _requireAvailable(bytes32 assetKey) override internal view {
		require(holder.get(assetKey) == ExchangeState.AssetType.Sell,
				"ExchangeSell#delist: asset is not listed");
	}

	function _validateOwnerOfToken(IERC721 erc721, uint256 tokenId) internal view returns(address)
	{
		address ownerOfToken = erc721.ownerOf(tokenId);
		require(ownerOfToken == _msgSender(), "ExchangeSell#_validateOwnerOfToken: caller must be owner of token");
		return ownerOfToken;
	}
}