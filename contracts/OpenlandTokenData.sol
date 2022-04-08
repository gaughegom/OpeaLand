//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "./common/NFTDataStorage.sol";
import "./OpenlandCollectible.sol";

//TODO debug
import "hardhat/console.sol";

contract OpenlandTokenData is NFTDataStorage {
	// store all nfts
	OpenlandTokenDomain[] public openlandTokens;

	// store all collection address
	address[] public collections;
	
	// check collection is existed
	mapping(address => bool) public collectionToBool;

	modifier onlyTokenOwner(address tokenOwner) {
		require(tokenOwner == msg.sender, "Only token's owner can call this function");
		_;
	}

	modifier existedCollection(address collection) {
		require(collectionToBool[collection], "OpenlandNFTData#isValidCollection: collection not found");
		_;
	}

	event SaveTokenData(address indexed collection, uint256 indexed tokenId, address indexed owner);


	/**
		@dev Save nft data to storage
	 */
	function saveTokenData(
		address _collection,
		uint256 _tokenId,
		uint256 _price
	) public
	{
		require(_price > 0, 'OpenlandNFTData#saveDataToken: token price is zero, please set price');
		
		OpenlandCollectible collection = OpenlandCollectible(_collection);
		address ownerOf = collection.ownerOf(_tokenId);
		require(ownerOf == msg.sender || collection.getApproved(_tokenId) == msg.sender, 
		"OpenlandNFTData#saveDataToken: caller do not have permission");
		
		OpenlandTokenDomain memory token = OpenlandTokenDomain(
			_collection,
			payable(ownerOf),
			_tokenId,
			_price,
			TokenStatus.closed
		);
		openlandTokens.push(token);
		emit SaveTokenData(_collection, _tokenId, ownerOf);
	}

	/**
		@dev Set the price of nft in storage
	 */
	function setTokenPrice(
		address _collection,
		uint256 _tokenId,
		uint256 _price
	) public
	{
		require(_price > 0, 'OpenlandNFTData#setTokenPrice: price must be greater than zero');
		uint256 tokenIndex = getTokenIndex(_collection, _tokenId);
		OpenlandTokenDomain storage token = openlandTokens[tokenIndex];
		require(token.owner == msg.sender, "Only token's owner can call this function");
		_setTokenPrice(token, _price);
	}

		/**
		@dev Return the index of token in the array
	 */
	function getTokenIndex(address _collection, uint256 _tokenId)
		public view existedCollection(_collection) returns (uint256) 
	{
		require(collectionToBool[_collection], "OpenlandNFTData#getTokenIndex: collection not found");
		uint256 length = openlandTokens.length;
		bool found = false;
		uint256 index = 0;
		for (uint256 i = 0; i < length; i++) {
			if (openlandTokens[i].collection == _collection && openlandTokens[i].tokenId == _tokenId) {
				found = true;
				index = i;
				break;
			}
		}
		require(found, "OpenlandNFTData#getTokenIndex: token not found");
		return index;
	}

		/**
		@dev Return the nft at index in storage
	 */
	function tokenAtIndex(uint256 _index) 
		public view returns(OpenlandTokenDomain memory)
	{
		return openlandTokens[_index];
	}

	function addCollection(address _collection) public
	{
		collectionToBool[_collection] = true;
		collections.push(_collection);
	}

	function _setTokenOwner(OpenlandTokenDomain storage _token, address payable _newOwner) internal {
		_token.owner = _newOwner;
	}

	function _setTokenPrice(OpenlandTokenDomain storage _token, uint256 _price) internal {
		_token.price = _price;
	}

	function _setTokenStatus(OpenlandTokenDomain storage _token, TokenStatus _status) internal {
		_token.status = _status;
	}
}