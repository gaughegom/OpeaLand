//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./common/NFTDataStorage.sol";
import "./OpenlandCollectible.sol";
import "./OpenlandTokenTradable.sol";

contract OpenlandFactory is NFTDataStorage, Ownable {
	OpenlandTokenTradable public tradable;
	OpenlandCollectible public defaultCollect;

	constructor(address _tradable)
	{
		tradable = OpenlandTokenTradable(_tradable);
	}

	/**
		@dev Create new collection from sender
	 */
	function createCollection(
		string memory _name,
		string memory _symbol
	) public
	{
		OpenlandCollectible collection = new OpenlandCollectible(_name, _symbol, msg.sender);
		tradable.addCollection(address(collection));
	}

	/**
		@dev Mint your own token with price in defaultCollection
	 */
	function mintToken() public
	{
		defaultCollect.mintTo(msg.sender);
	}

	/**
		@dev Set defaultCollection
	 */
	function setDefaultCollection(address _collection) public onlyOwner()
	{
		tradable.addCollection(_collection);
		defaultCollect = OpenlandCollectible(_collection);
	}

	/**
		@dev get defeaultCollection address
	 */
	function getDefaultCollection() public view returns(address) {
		return address(defaultCollect);
	}
}