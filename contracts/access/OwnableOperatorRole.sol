// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";


contract OwnableOperatorRole is Ownable {
	mapping(address => bool) bearers;

	event AddOperator(address indexed op);
	event RemoveOperator(address indexed op);

	modifier onlyOperator {
		require(isOperator(_msgSender()), "OwnableOperatorRole: caller is not operator");
		_;
	}

	function add(address op) external onlyOwner {
		bearers[op] = true;
		emit AddOperator(op);
	}

	function remove(address op) external onlyOwner {
		require(isOperator(op), "OwnableOperatorRole: this is not an operator");
		bearers[op] = false;
		emit RemoveOperator(op);
	}

	function isOperator(address op) public view returns(bool) {
		return bearers[op] == true;
	}
}
