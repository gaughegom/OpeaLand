//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./OpenlandTokenTradable.sol";

contract OpenlandExchange {

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
		(address payable beneficiary, uint256 value) = openlandTradable.exchangeToken(_collection, msg.sender, _tokenId, msg.value);
		beneficiary.transfer(value);
		payable(msg.sender).transfer(msg.value - value);
	}
}