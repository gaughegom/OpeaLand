import { useWeb3Store } from "../store";
import { ethers } from "ethers";

const useDetectAccountChange = () => {
	const setProvider = useWeb3Store((state) => state.setProvider);
	window.ethereum.on("accountsChanged", async function () {
		const httpProvider = new ethers.providers.Web3Provider(
			window.ethereum,
			"any"
		);

		setProvider(httpProvider);
	});
};

export default useDetectAccountChange;
