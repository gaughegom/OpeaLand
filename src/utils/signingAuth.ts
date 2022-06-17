import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";

export async function signAuth(
  signer: ethers.providers.JsonRpcSigner
): Promise<string> {
  const nonce = uuidv4();
  const signature = await signer.signMessage(nonce);
  return signature;
}
