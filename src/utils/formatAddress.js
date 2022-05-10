function formatAddress(address) {
	if (!address) return;
	return address.slice(0, 5).concat("...").concat(address.slice(-3));
}

export default formatAddress;
