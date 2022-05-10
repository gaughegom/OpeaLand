import { ethers } from "ethers";
import create from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

const initProvider = new ethers.providers.Web3Provider(window.ethereum, "any");

const handleSetProvider = async (set, get, provider) => {
	set({ provider: provider });
	const accounts = await provider.send("eth_requestAccounts", []);
	set({ address: accounts[0] });
};

const useWeb3Store = create(
	subscribeWithSelector(
		devtools((set, get) => ({
			provider: initProvider,
			address: null,
			setProvider: (provider) => {
				handleSetProvider(set, get, provider);
			}
		}))
	)
);

export default useWeb3Store;
