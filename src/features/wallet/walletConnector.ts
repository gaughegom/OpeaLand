import { ethers } from "ethers";
import { WalletProvider } from "./walletSlice";

export const walletConnector = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  const accounts = await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner(accounts[0]);
  const address = await signer.getAddress();
  const balance = await signer.getBalance("latest");

  const wallet: WalletProvider = {
    address,
    signer,
    balance
  };
  return wallet;
};
