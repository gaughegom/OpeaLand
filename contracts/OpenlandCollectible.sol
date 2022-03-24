//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BaseCollectible.sol";

//TODO debug
import "hardhat/console.sol";

/**
	This contract is collection
 */
contract OpenlandCollectible is BaseCollectible, Ownable {
	using Counters for Counters.Counter;

	Counters.Counter private _tokenId;
	string public baseURI;
	address public creator;

	event CreateToken(address indexed collectible, address to, uint256 tokenId);

	/**
		@dev constructor to initialize the contract collection
			default format will be: http://localhost:3000/contractName/{tokenId}
		@param _name name of the collection
		@param _symbol symbol of the collection
	 */
	constructor(string memory _name, string memory _symbol, address _creator)
		BaseCollectible(_name, _symbol) 
	{
		creator = _creator;
		transferOwnership(_creator);
	}

	/**
		@dev mint a new token to a given address
		tokenId auto increase
	 */
	function mintTo(address to)
		external onlyOwner()  returns(uint256)
	{
		_tokenId.increment();
		uint256 newTokenId = _tokenId.current();
		_safeMint(to, newTokenId);

		console.log('mint tokenId: ', newTokenId, address(this));
		emit CreateToken(address(this), to, newTokenId);
		return newTokenId;
	}

	/**
		@dev set baseUri server of collection contract 
	 */
	function setBaseURI(string memory uri) public onlyOwner() {
		baseURI = uri;
	}

	/**
		@dev return the baseURI of collection
	 */
	function _baseURI() internal view override returns (string memory) {
		return baseURI;
	}
}