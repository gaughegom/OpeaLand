//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./OpenlandCollectible.sol";
import "./OpenlandTokenData.sol";

contract OpenlandTokenTradable is OpenlandTokenData {
	event TokenStatusChange(
		address indexed collection, 
		uint256 indexed tokenId, 
		TokenStatus status)
	;

	event ExchangeToken(
		address indexed collection,
		address from,
		address indexed to,
		uint256 indexed tokenId
	);


	/**
		@dev List token on marketplace
	 */
	function openTrade(
		address _collection,
		uint256 _tokenId
	) public
	{
		uint256 tokenIndex = getTokenIndex(_collection, _tokenId);
		OpenlandTokenDomain storage token = openlandTokens[tokenIndex];
		require(token.owner == msg.sender, "OpenlandTokenTradable#openTrade: only token owner can open trade");
		_setTokenStatus(token, TokenStatus.opened);

		emit TokenStatusChange(_collection, _tokenId, TokenStatus.opened);
	}

	/**
		@dev Close token on marketplace
	 */
	function closeTrade(
		address _collection,
		uint256 _tokenId
	) public
	{
		uint256 tokenIndex = getTokenIndex(_collection, _tokenId);
		OpenlandTokenDomain storage token = openlandTokens[tokenIndex];
		require(token.owner == msg.sender);
		_setTokenStatus(token, TokenStatus.closed);

		emit TokenStatusChange(_collection, _tokenId, TokenStatus.closed);
	}

		/**
		@dev Transfer token to another address
		Call when token is buyed
	 */
	function exchangeToken(
		address _collection,
		address _to,
		uint256 _tokenId,
		uint256 _bidValue
	)
		public returns (address payable, uint256 _value)
	{
		uint256 tokenIndex = getTokenIndex(_collection, _tokenId);
		OpenlandTokenDomain storage token = openlandTokens[tokenIndex];

		require(token.status == TokenStatus.opened, "OpenlandNFTData#exchangeToken: token is not opened");
		require(_bidValue >= token.price, "OpenlandNFTData#exchangeToken: bid value is less than token price");

		OpenlandCollectible collection = OpenlandCollectible(token.collection);
		collection.safeTransferFrom(token.owner, _to, token.tokenId);
		
		address payable beneficiary = token.owner;

		_setTokenOwner(token, payable(_to));
		_setTokenStatus(token, TokenStatus.closed);

		emit ExchangeToken(_collection, beneficiary, _to, _tokenId);

		return (beneficiary, token.price);
	}
}