//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "../libs/HashAsset.sol";
import "../exchange/domain/ExchangeDomain.sol";

contract MockHashAsset {
	function hashKeyWithToken(address token, uint256 tokenId) public pure returns(bytes32) {
		return HashAsset.hashKey(token, tokenId);
	}

	function hashKeyWithDomain(ExchangeDomain.AssetDomain calldata domain) public pure returns(bytes32) {
		return HashAsset.hashKey(domain);
	}
}
