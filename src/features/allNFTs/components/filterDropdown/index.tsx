import React from "react";

import styles from "./filterDropdownStyles.module.scss";

import Grid from "@mui/material/Grid";

export default function FilterDropdown() {
    const dropDownItem = [
        { title: "Price: Low to High", key: "up" },
        { title: "Price: High to Low", key: "down" },
    ];

    return (
        <div className={styles.box}>
            <Grid container direction="column" className={styles.grid}>
                {dropDownItem.map((item, idx) => (
                    <div className={styles.item} key={idx}>
                        {item.title}
                    </div>
                ))}
            </Grid>
        </div>
    );
}
