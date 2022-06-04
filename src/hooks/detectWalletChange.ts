import React from "react";
import { useAppDispatch } from ".";
import { walletConnector } from "../features/wallet/walletConnector";
import { setWalletProvider } from "../features/wallet/walletSlice";

export const useDetectWalletChange = async () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    window.ethereum.on("accountsChanged", async function () {
      dispatch(setWalletProvider(await walletConnector()));
    });
  }, [dispatch]);
};
