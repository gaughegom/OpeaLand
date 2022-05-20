//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "../exchange/domain/ExchangeDomain.sol";


library HashAsset {
	function hashKey(address token, uint256 tokenId) internal pure returns(bytes32) {
		return keccak256(abi.encodePacked(token, tokenId));
	}

	function hashKey(ExchangeDomain.AssetDomain calldata domain) internal pure returns(bytes32){
		return keccak256(abi.encodePacked(domain.token, domain.tokenId));
	}
}