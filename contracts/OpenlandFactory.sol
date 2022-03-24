//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./common/NFTDataStorage.sol";
import "./OpenlandCollectible.sol";
import "./OpenlandTokenTradable.sol";

contract OpenlandFactory is NFTDataStorage {
	OpenlandTokenTradable public tradable;

	constructor(address _tradable)
	{
		tradable = OpenlandTokenTradable(_tradable);
	}


	function createCollection(
		string memory _name,
		string memory _symbol
	) public
	{
		OpenlandCollectible collection = new OpenlandCollectible(_name, _symbol, msg.sender);
		tradable.addCollection(address(collection));
	}
}