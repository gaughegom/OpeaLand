// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";


abstract contract ProxyAccess is Ownable {
	mapping(bytes32 => mapping(address => bool)) private _accesses;

	event GrantAccess(bytes32 role, address op);
	event RevokeAccess(bytes32 role, address op);


	modifier onlyAccess(bytes32 role) {
		require(hasAccess(role), "ProxyAccess: caller not have access");
		_;
	}


	function grantAccess(bytes32 role, address operator) external onlyOwner {
		_grantAccess(role, operator);
	}

	function revokeAccess(bytes32 role, address op) external onlyOwner {
		delete _accesses[role][op];
		emit RevokeAccess(role, op);
	}

	function hasAccess(bytes32 role) public view returns(bool) {
		return _accesses[role][_msgSender()] == true;
	}


	function _grantAccess(bytes32 role, address op) internal {
		_accesses[role][op] = true;
		emit GrantAccess(role, op);
	}
}