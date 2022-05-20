import { default as Logo } from "../../images/openland-logo.png";
import { AppBar, Grid, Link, TextField, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ConnectButton from "./ConnectButton";


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

	return (
		<>
			<AppBar sx={{ background: "#ffffff" }}>
				<Grid item sm={12} xs={12} sx={{ margin: "auto", width: "100%" }}>
					<Toolbar>
						<Grid>
							<Link>
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
						<ConnectButton />
					</Toolbar>
				</Grid>
			</AppBar>
		</>
	);
}

export default Header;
