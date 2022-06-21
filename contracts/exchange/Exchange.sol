// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./ExchangeAuction.sol";
import "./ExchangeSell.sol";
import "./Holder.sol";
import "../libs/HashAsset.sol";

contract Exchange {
	ExchangeAuction excAuct;
	ExchangeSell excSell;
	Holder holder;

    event Bid(address token, uint256 tokenId, ExchangeState.AssetType assetType);

	constructor(address _auct, address _sell, address _holder) {
		excAuct = ExchangeAuction(payable(_auct));
		excSell = ExchangeSell(payable(_sell));
		holder = Holder(_holder);
	}

	function bid(address token, uint256 tokenId) external payable {
		bytes32 assetKey = HashAsset.hashKey(token, tokenId);
		ExchangeState.AssetType actionType = holder.get(assetKey);
		if (actionType == ExchangeState.AssetType.NULL) {
			return; //	end if asset is null (mean not list anywhere)
		}
		if (actionType == ExchangeState.AssetType.Sell) {
			excSell.purchase{value: msg.value}(assetKey);
		} else {
			excAuct.bid{value: msg.value}(assetKey);
		}

        emit Bid(token, tokenId, actionType);
	}
}
