//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

contract Migration {
	bool public migrated;

	constructor() {
		_setMigrated();
	}

	function _setMigrated() internal {
		migrated = true;
	}
}