import React from "react";

import styles from "./filterStyle.module.scss";

import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Filter() {
    const filterIconSize = 24;

    return (
        <div className={styles.box}>
            <div className={styles.icon}>
                <FilterListIcon sx={{ fontSize: filterIconSize }} />
            </div>

            <div className={styles.filter}>
                <p>Sort by</p>
                <KeyboardArrowDownIcon sx={{fontSize: filterIconSize}}/>
            </div>
        </div>
    );
}
