// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

abstract contract ExchangeCore is Ownable {
	using Address for address;

	uint256 public balance;

	event Receive(uint256 amount, address sender);
	event Withdraw(uint256 amount, address caller);

	/**
		@dev Make contract can receive eth
	 */
	receive() external payable
	{
		balance += msg.value;
		emit Receive(msg.value, _msgSender());
	}

	/**
		@dev Allow owner to withdraw eth balance in this contract
	 */
	function withdraw(uint256 amount) external onlyOwner
	{
		require(amount <= balance, "ExchangeCore#withdraw: amount must be lesser than balance");

		(bool success, ) = payable(_msgSender()).call{value: amount}("");
		require(success, "Withdraw failed");

		balance -= amount;
		
		emit Withdraw(amount, _msgSender());
	}

	function _msgSender() override virtual internal view returns(address) {
		if (msg.sender.isContract()) {
			return tx.origin;
		}
		return super._msgSender();
	}

	function _requireAvailable(bytes32 assetKey) virtual internal {}
	function _requireOwnerOfToken(address token, uint256 tokenId) virtual internal returns(address){}
}