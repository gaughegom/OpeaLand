import { BigNumber, ethers } from "ethers";

export async function signerBalance(
  signer: ethers.providers.JsonRpcSigner
): Promise<BigNumber> {
  const balance = await signer.getBalance();
  return balance;
}

export async function providerBalance(
  provider: ethers.providers.Web3Provider,
  address: string
): Promise<BigNumber> {
  const balance = await provider.getBalance(address);
  return balance;
}
