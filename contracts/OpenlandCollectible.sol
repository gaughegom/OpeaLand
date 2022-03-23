//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./BaseCollectible.sol";

//TODO debug
import "hardhat/console.sol";

/**
	This contract is collection
 */
contract OpenlandCollectible is BaseCollectible {
	using Counters for Counters.Counter;

	Counters.Counter private _tokenId;
	string public baseURI;
	address public trade;

	/**
		@dev constructor to initialize the contract collection
			default format will be: http://localhost:3000/contractName/{tokenId}
		@param _name name of the collection
		@param _symbol symbol of the collection
	 */
	constructor(string memory _name, string memory _symbol, address _trade)
		BaseCollectible(_name, _symbol) 
	{
		trade = _trade;
	}

	/**
		@dev mint a new token to a given address
		tokenId auto increase
	 */
	function mintTo(address to)
		external returns(uint256)
	{
		_tokenId.increment();
		uint256 newTokenId = _tokenId.current();
		_safeMint(to, newTokenId);
		approve(trade, newTokenId);

		console.log('mint tokenId: ', newTokenId);	//TODO for debug

		return newTokenId;
	}

	/**
		@dev set baseUri server of collection contract 
	 */
	function setBaseURI(string memory uri) public {
		baseURI = uri;
	}

	/**
		@dev return the baseURI of collection
	 */
	function _baseURI() internal view override returns (string memory) {
		return baseURI;
	}
}