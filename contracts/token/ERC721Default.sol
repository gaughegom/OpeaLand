//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./ERC721Land.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Default is Ownable {
	ERC721Land erc721;

	event MintAtDefault(address indexed sender, uint256 indexed tokenId);

	function mint(string memory tokenUri) external {
		uint256 tokenId = erc721.mint(_msgSender(), tokenUri);
		emit MintAtDefault(_msgSender(), tokenId);
	}

	function setDefault(address _erc721) external onlyOwner {
		erc721 = ERC721Land(_erc721);
	}
}