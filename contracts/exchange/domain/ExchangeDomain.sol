//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "./ExchangeState.sol";


contract ExchangeDomain {
	struct AssetDomain {
		address token;
		address payable seller;
		uint256 tokenId;
	}

	struct AssetSell {
		AssetDomain domain;
		uint256 price;
	}

	struct AssetAuction {
		AssetDomain domain;
		uint256 startPrice;
		uint256 endTime;
	}

	struct AuctionParam {
		uint256 highestBid;
		address highestBidder;
		address[] bidders;
		mapping (address => uint256) pendingReturns;
	}
}
