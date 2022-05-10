// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./HolderState.sol";


contract Holder is IERC721Receiver, HolderState
{
	function onERC721Received(address, address, uint256, bytes memory) 
	virtual override public returns(bytes4)
	{
		return this.onERC721Received.selector;
	}
}
