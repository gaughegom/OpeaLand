import { Contract } from "ethers";

export async function mintERC721Token(
	contract: Contract,
	ownerAddress: string,
	tokenUri: string
) {
	await (await contract.mint(ownerAddress, tokenUri)).wait();
}
