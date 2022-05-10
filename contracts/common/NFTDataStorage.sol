//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "../OpenlandCollectible.sol";

contract NFTDataStorage {
	struct OpenlandTokenDomain
	{
		address collection;
		address payable owner;
		uint256 tokenId;
		uint256 price;
		TokenStatus status; // closed, opened state
	}

	enum TokenStatus 
	{
		closed,
		opened
	}
}