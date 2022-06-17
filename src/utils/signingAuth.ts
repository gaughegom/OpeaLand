import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";

interface IMessageVerify {
  nonce: string;
  signature: string;
}

export async function signAuth(
  signer: ethers.providers.JsonRpcSigner
): Promise<IMessageVerify> {
  const nonce = uuidv4();
  const signature = await signer.signMessage(nonce);
  const verifyMsg: IMessageVerify = {
    nonce,
    signature
  };
  return verifyMsg;
}
