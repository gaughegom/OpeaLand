// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./domain/ExchangeState.sol";
import "../access/ProxyAccess.sol";

abstract contract HolderState is ProxyAccess {
	mapping (bytes32 => ExchangeState.AssetType) public assetTypes;

	bytes32 public constant EXCHANGE_ROLE = keccak256("EXCHANGE_ROLE");

	/**
		@dev Set asset token type, which type it's pin on market
		@notice This action MUST be call anytime when an asset token pin on market.
	 */
	function set(bytes32 key, ExchangeState.AssetType assetType) external onlyAccess(EXCHANGE_ROLE)
	{
		assetTypes[key] = assetType;
	}

	/**
		@dev Get the state of asset type from holder
	 */
	function get(bytes32 key) external view returns(ExchangeState.AssetType)
	{
		return assetTypes[key];
	}
}
