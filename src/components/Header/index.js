import Logo from "../../images/openland-logo.png";

import { AppBar, Button, Grid, Link, TextField, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import React from "react";

import { useWeb3Store } from "../../store";

import formatAddress from "../../utils/formatAddress";

function Header() {
	const styles = {
		logoBox: {
			padding: "4px 12px",
			cursor: "pointer"
		},
		searchBox: {
			background: "#ffffff",
			input: { color: "black" },
			"::placeholder": {
				color: "#99b4cd"
			},
			minWidth: "520px",
			marginLeft: "auto"
		}
	};

	// store
	const injectedProvider = useWeb3Store((state) => state.injectedProvider);
	const address = useWeb3Store((state) => state.address);
	const setInjectedProvider = useWeb3Store(
		(state) => state.setInjectedProvider
	);
	const setSigner = useWeb3Store((state) => state.setSigner);

	const loadEthersProvider = React.useCallback(async () => {
		console.log("loadEthersProvider");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []);
		setInjectedProvider(provider);
		setSigner(provider.getSigner());
	}, [setInjectedProvider, setSigner]);

	React.useEffect(() => {
		console.log("useEffect");
		if (!injectedProvider) {
			loadEthersProvider();
		}
	}, [loadEthersProvider]);

	// if (injectedProvider) {
	// 	injectedProvider.on("network", (newNetwork, oldNetwork) => {
	// 		// When a Provider makes its initial connection, it emits a "network"
	// 		// event with a null oldNetwork along with the newNetwork. So, if the
	// 		// oldNetwork exists, it represents a changing network
	// 		if (oldNetwork) {
	// 			window.location.reload();
	// 		}
	// 	});
	// }

	return (
		<>
			<AppBar sx={{ background: "#ffffff" }}>
				<Grid item sm={12} xs={12} sx={{ margin: "auto", width: "100%" }}>
					<Toolbar>
						<Grid>
							<Link to="/" sx={styles.logoBox}>
								<Box
									component="img"
									src={Logo}
									alt="Logo"
									sx={{
										height: "40px"
									}}
								/>
							</Link>
						</Grid>
						<TextField
							sx={styles.searchBox}
							placeholder="Search items"
							variant="outlined"
							size="small"
						/>
						<Button
							sx={{ marginLeft: "auto" }}
							variant="contained"
							color="primary"
							onClick={loadEthersProvider}
						>
							{address ? formatAddress(address) : "Connect"}
						</Button>
					</Toolbar>
				</Grid>
			</AppBar>
		</>
	);
}

export default Header;
