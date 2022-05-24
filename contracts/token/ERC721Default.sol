//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./ERC721Land.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Default is Ownable {
	ERC721Land erc721;

	function mint(string memory tokenUri) external {
		erc721.mint(_msgSender(), tokenUri);
	}

	function setDefault(address _erc721) external onlyOwner {
		erc721 = ERC721Land(_erc721);
	}
}