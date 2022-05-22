import * as React from "react";

import styles from "./searchStyles.module.scss";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
    return (
        <div className={styles.box}
        >
            <SearchIcon sx={{fontSize: 24, color: "#767F88"}}/>
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize:14, color: "#737D85"}}
                placeholder="Search Item, Collections"
            />
        </div>
    );
}
