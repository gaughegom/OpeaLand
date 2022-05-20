import { ethers } from "ethers";

const useWeb3Provider = () => {
	const httpProvider = new ethers.providers.Web3Provider(
		window.ethereum,
		"any"
	);

	return httpProvider;
};

export default useWeb3Provider;
