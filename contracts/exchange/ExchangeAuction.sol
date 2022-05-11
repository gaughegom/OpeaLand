// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "./ExchangeCore.sol";
import "./domain/ExchangeDomain.sol";
import "../proxy/TransferProxy.sol";
import "./Holder.sol";
import "../libs/HashAsset.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";

contract ExchangeAuction is ExchangeCore {
	using SafeMath for uint256;

	mapping (bytes32 => ExchangeDomain.AssetAuction) public assetsAuction;
	mapping (bytes32 => ExchangeDomain.AuctionParam) public auctionsParam;

	event StartAuction(bytes32 assetKey);
	event EndAuction(bytes32 assetKey);

	TransferProxy transferProxy;
	Holder holder;

	uint256 public constant LOWEST_PRICE = 0.001 ether;

	/**
		Init with transferProxy and holder
	 */
	constructor(address _transfer, address _holder)
	{
		transferProxy = TransferProxy(_transfer);
		holder = Holder(_holder);
	}

	/**
		@dev Start an auction with asset token
		When this action is called, asset token is transfer to holder
	 */
	function start(
		address token,
		uint256 tokenId,
		uint256 startPrice,
		uint256 endTime
	) external
	{
		require(endTime >= block.timestamp, "ExchangeAuction#start: invalid end time");
		require(startPrice >= LOWEST_PRICE, "ExchangeAuction#start: start price is too low");
		IERC721 erc721 = IERC721(token);
		address ownerOfToken = erc721.ownerOf(tokenId);
		require(_msgSender() == ownerOfToken, "Caller is not owner of token");

		bytes32 assetKey = HashAsset.hashKey(token, tokenId);
		ExchangeDomain.AssetDomain memory assetDomain = ExchangeDomain.AssetDomain(
			token,
			payable(_msgSender()),
			tokenId
		);
		ExchangeDomain.AssetAuction memory asset = ExchangeDomain.AssetAuction(
			assetDomain,
			startPrice,
			endTime
		);

		assetsAuction[assetKey] = asset;

		transferProxy.erc721SafeTransfer(
			erc721,
			ownerOfToken,
			address(holder),
			tokenId
		);
		holder.set(assetKey, ExchangeState.AssetType.Auction);

		emit StartAuction(assetKey);
	}

	/**
		@dev End an auction
		When an auction end, return token from holder to seller
		@notice Auction is ONLY end when block timestamp is over endTime.
		All bid value MUST be refund to bidder
		A fee will be given to this contract when auction end (8% of selling)
	 */
	function end(address token, uint256 tokenId) external
	{
		bytes32 assetKey = HashAsset.hashKey(token, tokenId);
		_requireAvailable(assetKey);
		ExchangeDomain.AssetAuction memory asset = assetsAuction[assetKey];
		_requireEndTime(asset.endTime);

		ExchangeDomain.AuctionParam storage auctionParam = auctionsParam[assetKey];

		// transfer highest bid
		if (auctionParam.highestBid == 0) {
			transferProxy.erc721SafeTransfer(IERC721(token), address(holder), asset.domain.seller, tokenId);
			return;
		} 
		//
		uint256 tx_fee = auctionParam.highestBid.div(25).mul(2);
		(bool transferFee, ) = payable(address(this)).call{value: tx_fee}("");
		require(transferFee, "ExhcangeAuction#end: transfer fee failed");
		(bool transferBid, ) = payable(auctionParam.highestBidder).call{value: auctionParam.highestBid - tx_fee}("");
		require(transferBid, "ExchangeAuction#end: transfer beneficiary failed");
		
		// transfer token
		transferProxy.erc721SafeTransfer(IERC721(token), address(holder), auctionParam.highestBidder, tokenId);
		holder.set(assetKey, ExchangeState.AssetType.NULL);

		// refund all
		for (uint i = auctionParam.bidders.length - 1; i >= 0; i++) {
			_refund(assetKey, auctionParam.bidders[i]);
			auctionParam.bidders.pop();
		}
	}

	/**
		@dev Bid an auction in holder
		@notice Bid value MUST be higher than highest bid or start price.
		Bid value will be calculated by adding the amount valu bided before and
		new value bid this action
	 */
	function bid(bytes32 assetKey) external payable
	{
		_requireAvailable(assetKey);
		_requireEndTime(assetsAuction[assetKey].endTime);
		ExchangeDomain.AuctionParam storage auctionParam = auctionsParam[assetKey];
		if (auctionParam.highestBid == 0) {
			require(msg.value >= assetsAuction[assetKey].startPrice, "ExchangeAuction: bid value is lower than start price");
			_setHighestBid(auctionParam, msg.value);
			auctionParam.bidders.push(_msgSender());
			return;
		}

		uint bidValue = msg.value;
		uint biddedValue = auctionParam.pendingReturns[_msgSender()];
		if (biddedValue != 0) {
			auctionParam.pendingReturns[_msgSender()] += bidValue;
			bidValue += biddedValue;
		} else {
			auctionParam.bidders.push(_msgSender());
		}
		require(bidValue >= auctionParam.highestBid, "ExchangeAuction: bid value is lower than the highest price");

		_setHighestBid(auctionParam, bidValue);

	}
	
	/**
		@dev Allow bidder withdraw bid value by asset
	 */
	function refund(bytes32 assetKey) public
	{
		_refund(assetKey, _msgSender());
	}

	function _refund(bytes32 assetKey, address caller) internal
	{
		uint256 amount = auctionsParam[assetKey].pendingReturns[caller];
		if (!(amount > 0)) {
			return;
		}
		(bool transferBid, ) = payable(caller).call{value: amount}("");
		require(transferBid, "Refund failed");

		delete auctionsParam[assetKey].pendingReturns[caller];
	}

	function _setHighestBid(ExchangeDomain.AuctionParam storage auctionParam, uint256 value) internal {
		auctionParam.highestBid = value;
		auctionParam.highestBidder = _msgSender();
	}
	
	function _requireAvailable(bytes32 assetKey) override internal view
	{
		require(holder.get(assetKey) == ExchangeState.AssetType.Auction,
				"ExchangeAuction: asset is not in auction");
	}
	
	function _requireEndTime(uint256 endTime) internal view
	{
		require(block.timestamp >= endTime, "ExchangeAuction: aution time is not end");
	}
}