import { BigNumber, ethers } from "ethers";

export async function signerBalance(
  signer: ethers.providers.JsonRpcSigner
): Promise<BigNumber> {
  const balance = await signer.getBalance("latest");
  return balance;
}

export async function providerBalance(
  provider: ethers.providers.JsonRpcProvider,
  address: string
): Promise<BigNumber> {
  const balance = await provider.getBalance(address);
  return balance;
}
