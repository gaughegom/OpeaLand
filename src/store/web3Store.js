import create from "zustand";
import { devtools } from "zustand/middleware";

const useWeb3Store = create(
	devtools((set, get) => ({
		injectedProvider: undefined,
		signer: undefined,
		address: undefined,
		setInjectedProvider: function (injected) {
			set({ injectedProvider: injected });
		},
		setSigner: async function (signer) {
			set({ signer: signer });
			const address = await get().signer.getAddress();
			set({ address: address });
		}
	}))
);

export default useWeb3Store;
