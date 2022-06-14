function formatAddress(address: string | undefined) {
	if (!address || address.length < 13) return address;
	return address.slice(0, 8).concat("...").concat(address.slice(-5));
}

export default formatAddress;
