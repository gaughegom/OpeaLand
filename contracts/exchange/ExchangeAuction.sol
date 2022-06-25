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
	event Refund(bytes32 assetKey, address beneficiary);

	TransferProxy transferProxy;
	Holder holder;

	// uint256 public constant LOWEST_PRICE = 0.001 ether;

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
		uint256 time
	) external
	{
		// require(startPrice >= LOWEST_PRICE, "ExchangeAuction#start: start price is too low");
		IERC721 erc721 = IERC721(token);
		address ownerOfToken = erc721.ownerOf(tokenId);
		require(_msgSender() == ownerOfToken, "Caller is not owner of token");

		uint256 endTime = block.timestamp + time;
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
		require(_isAuctionEnd(asset.endTime), "ExchangeAuction: auction is not end");

		ExchangeDomain.AuctionParam storage auctionParam = auctionsParam[assetKey];

		emit EndAuction(assetKey);
		// transfer highest bid
		if (auctionParam.highestBidder == address(0)) {
			transferProxy.erc721SafeTransfer(IERC721(token), address(holder), asset.domain.seller, tokenId);
			return;
		} 
		//
		uint256 tx_fee = auctionParam.highestBid.div(25).mul(2);
		(bool transferFee, ) = payable(address(this)).call{value: tx_fee}("");
		require(transferFee, "ExhcangeAuction: transfer fee failed");
		(bool transferBid, ) = payable(asset.domain.seller).call{value: auctionParam.highestBid - tx_fee}("");
		require(transferBid, "ExchangeAuction: transfer beneficiary failed");
		auctionParam.pendingReturns[auctionParam.highestBidder] = 0;
		
		// transfer token
		transferProxy.erc721SafeTransfer(IERC721(token), address(holder), auctionParam.highestBidder, tokenId);
		holder.set(assetKey, ExchangeState.AssetType.NULL);

		// refund all
		uint bidderCount = auctionParam.bidders.length;
		for (uint i = 0; i <= bidderCount - 1; i++) {
			_refund(assetKey, auctionParam.bidders[i]);
			delete auctionParam.bidders[i];
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
		require(!_isAuctionEnd(assetsAuction[assetKey].endTime), "ExchangeAuction: auction is ended");
		ExchangeDomain.AuctionParam storage auctionParam = auctionsParam[assetKey];
		if (auctionParam.highestBid == 0) {
			require(msg.value >= assetsAuction[assetKey].startPrice, "ExchangeAuction: bid value is lower than start price");
			_setHighestBid(auctionParam, msg.value);
			_newBidder(auctionParam, msg.value);
			return;
		}

		uint bidValue = msg.value;
		uint biddedValue = auctionParam.pendingReturns[_msgSender()];
		if (biddedValue != 0) {
			bidValue += biddedValue;
			auctionParam.pendingReturns[_msgSender()] = bidValue;
		} else {
			_newBidder(auctionParam, bidValue);
		}
		require(bidValue >= auctionParam.highestBid, "ExchangeAuction: bid value is lower than the highest price");

		_setHighestBid(auctionParam, bidValue);

	}

    function bidValueInAsset(bytes32 assetKey) external view returns(uint256) {
        uint256 value = auctionsParam[assetKey].pendingReturns[_msgSender()];
        return value;
    }
	
	/**
		@dev Allow bidder withdraw bid value by asset
	 */
	function refund(bytes32 assetKey) public
	{
		_refund(assetKey, _msgSender());
		emit Refund(assetKey, _msgSender());
	}

	function _refund(bytes32 assetKey, address caller) internal
	{
		ExchangeDomain.AuctionParam storage auctParam = auctionsParam[assetKey];
		uint256 amount = auctParam.pendingReturns[caller];
		if (!(amount > 0)) {
			return;
		}
		payable(caller).transfer(amount);
		delete auctParam.pendingReturns[caller];
	}

	
	function _requireAvailable(bytes32 assetKey) override internal view
	{
		require(holder.get(assetKey) == ExchangeState.AssetType.Auction,
				"ExchangeAuction: asset is not in auction");
	}

	function _isAuctionEnd(uint256 endTime) internal view returns(bool)
	{
		return block.timestamp >= endTime;
	}

	function _setHighestBid(ExchangeDomain.AuctionParam storage auctionParam, uint256 value) internal
	{
		auctionParam.highestBid = value;
		auctionParam.highestBidder = _msgSender();
	}

	function _newBidder(ExchangeDomain.AuctionParam storage auctionParam, uint256 value) internal
	{
		auctionParam.bidders.push(_msgSender());
		auctionParam.pendingReturns[_msgSender()] = value;
	}
}