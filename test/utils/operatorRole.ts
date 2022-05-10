import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

export async function addOwnableOperatorRole(
	contracts: Contract[],
	op: Contract,
	host: SignerWithAddress
) {
	for await (let contract of contracts) {
		await (await contract.connect(host).add(op.address)).wait();
	}
}
