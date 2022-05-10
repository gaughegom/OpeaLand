//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../access/OwnableOperatorRole.sol";

contract TransferProxy is OwnableOperatorRole {
	function erc721SafeTransfer(
		IERC721 erc721,
		address from,
		address to,
		uint256 tokenId
	) external onlyOperator {
		IERC721(erc721).safeTransferFrom(from, to, tokenId);
	}
}
