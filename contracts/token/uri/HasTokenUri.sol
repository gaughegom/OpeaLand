//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;



abstract contract HasTokenUri {
	mapping(uint256 => string) private _tokenUris;

	function tokenUri(uint256 tokenId) external view returns(string memory) {
		return _tokenUris[tokenId];
	}

	function _setTokenUri(uint256 tokenId, string memory uri) internal {
		_tokenUris[tokenId] = uri;
	}
}
