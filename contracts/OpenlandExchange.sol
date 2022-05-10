//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./OpenlandTokenTradable.sol";
import "./common/NFTDataStorage.sol";

contract OpenlandExchange is NFTDataStorage {

	OpenlandTokenTradable public openlandTradable;

	constructor(address _openlandTradable)
	{
		openlandTradable = OpenlandTokenTradable(_openlandTradable);
	}

	function exchange(
		address _collection,
		uint256 _tokenId
	) public payable
	{
		uint256 tokenIndex = openlandTradable.getTokenIndex(_collection, _tokenId);
		OpenlandTokenDomain memory token = openlandTradable.tokenAtIndex(tokenIndex);
		_beforeExchange(token, msg.value);
		_executeExchange(tokenIndex);
		token.owner.transfer(msg.value);
	}

	function _beforeExchange(OpenlandTokenDomain memory token, uint256 bid) internal pure {
		require(token.status == TokenStatus.opened, "OpenlandExchange#_beforeExchange: token is not opened");
		require(token.price <= bid, "OpenlandExchange#_beforeExchange: bid is less than token price");
	}

	function _executeExchange(uint256 tokenIndex) internal {
		openlandTradable.transferToken(tokenIndex, msg.sender);
	}
}