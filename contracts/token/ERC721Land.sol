//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../access/ProxyAccess.sol";
import "./uri/HasTokenUri.sol";

contract ERC721Land is ERC721Enumerable, ProxyAccess, HasTokenUri {
	using Counters for Counters.Counter;
	
	Counters.Counter private _tokenIdCounter;
	bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
	
	constructor(
		string memory _name, 
		string memory _symbol, 
		address _transferProxy
	) ERC721(_name, _symbol) {
		_grantAccess(TRANSFER_ROLE, _transferProxy);
	}


	function mint(address to, string memory tokenUri) public onlyOwner returns(uint256) {
		_tokenIdCounter.increment();
		uint256 newTokenId = _tokenIdCounter.current();
		_safeMint(to, newTokenId);
		_setTokenUri(newTokenId, tokenUri);

		return newTokenId;
	}

	function isApprovedForAll(address owner, address operator) 
		override public view returns(bool){
		if (hasAccess(TRANSFER_ROLE)) {
			return true;
		} else {
			return super.isApprovedForAll(owner, operator);
		}
	}
}