//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "../common/Roles.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OperatorRoles is Ownable {
	using Roles for Roles.Role;

	Roles.Role private _operators;

	modifier onlyOperator() {
		require(isOperator(msg.sender), "OperatorRole#onlyOperator: sender is not operator");
		_;
	}

	function isOperator(address account) public view returns(bool) {
		return _operators.has(account);
	}

	function addOperator(address account) public onlyOwner {
		_operators.add(account);
	}

	function removeOperator(address account) public onlyOwner {
		_operators.remove(account);
	}
}