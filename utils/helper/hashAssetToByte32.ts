import { ethers } from "ethers";
import { IAssetDomain } from "../../model/Asset.model";

export function hashBytes32Key(domain: IAssetDomain) {
	return ethers.utils.solidityKeccak256(
		["address", "uint256"],
		[domain.token, domain.tokenId]
	);
}
