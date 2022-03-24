//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/**
	This contract is used for collection in Openland.
 */
contract BaseCollectible is ERC721Enumerable {
	constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) 
	{
	}

	/**
		@dev Return all tokens of `_owner` in this collection
	 */
	function tokensOfOwner(address _owner)
		external view returns (uint[] memory)
	{
		uint tokenCount = balanceOf(_owner);
		uint[] memory tokensId = new uint[](tokenCount);
		
		for (uint i = 0; i < tokenCount; i++) {
			tokensId[i] = tokenOfOwnerByIndex(_owner, i);
		}

		return tokensId;
	}

	/**
		@dev Return all tokens in this collection
	 */
	function allTokens() external view returns(uint[] memory)
	{
		uint total = totalSupply();
		uint[] memory tokensId = new uint[](total);
		for (uint256 i = 0; i < total; i++) {
			tokensId[i] = tokenByIndex(i);
		}
		return tokensId;
	}
}