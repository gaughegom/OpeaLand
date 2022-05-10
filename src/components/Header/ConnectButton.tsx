import { Button } from "@mui/material";
import React, { memo } from "react";

function ConnectButton() {
	return (
		<>
			<Button
				sx={{ marginLeft: "auto", minWidth: "150px", borderRadius: "8px" }}
				variant="contained"
				color="primary"
			></Button>
		</>
	);
}

export default memo(ConnectButton);
