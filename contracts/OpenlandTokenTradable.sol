//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./OpenlandCollectible.sol";
import "./OpenlandTokenData.sol";
import "./roles/OperatorRoles.sol";

contract OpenlandTokenTradable is OpenlandTokenData, OperatorRoles {
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
	function transferToken(uint256 _tokenIndex, address _to) public onlyOperator {
		OpenlandTokenDomain storage token = openlandTokens[_tokenIndex];
		OpenlandCollectible collect = OpenlandCollectible(token.collection);

		collect.safeTransferFrom(token.owner, _to, token.tokenId);
		address payable oldOwner = token.owner;

		_setTokenOwner(token, payable(_to));
		_setTokenStatus(token, TokenStatus.closed);

		emit ExchangeToken(token.collection, oldOwner, _to, token.tokenId);
	}
}