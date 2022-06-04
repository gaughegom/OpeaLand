import React from "react";
import { walletConnector } from "../features/wallet/walletConnector";

export const useDetectWalletChange = async () => {
  React.useEffect(() => {
    async function listenWallet() {
      window.ethereum.on("accountsChanged", async function () {
        walletConnector();
      });
    }
    console.log("account changed");
    listenWallet();
  }, [window.ethereum]);
};
