import React from "react";
import { useState } from "react";

import styles from "./filterStyle.module.scss";

import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import FilterDropdown from "../filterDropdown";

export default function Filter() {
    const filterIconSize = 24;

    const [openDropdown, setOpenDropdown] = useState(true);

    return (
        <div className={styles.box}>
            <div className={styles.icon}>
                <FilterListIcon sx={{ fontSize: filterIconSize }} />
            </div>

            <div className={styles.filter}>
                <div className={styles.holder}>
                    <p>Sort by</p>
                    <KeyboardArrowDownIcon sx={{ fontSize: filterIconSize }} />
                </div>
                {openDropdown && <FilterDropdown></FilterDropdown>}
            </div>
        </div>
    );
}
