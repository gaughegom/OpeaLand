import React from "react";

import styles from "./filterDropdownStyles.module.scss";

import Grid from "@mui/material/Grid";

type Props = {
    onClose: () => void,
    open: boolean,
}

export default function FilterDropdown({onClose,open}:Props) {
    const dropDownItem = [
        { title: "Price: Low to High", key: "up" },
        { title: "Price: High to Low", key: "down" },
    ];

    return (
        <div className={styles.box} style={{display: (open) ? 'block' : 'none'}}>
            <Grid container direction="column" className={styles.grid}>
                {dropDownItem.map((item, idx) => (
                    <div className={styles.item} key={idx} onClick={onClose}>
                        {item.title}
                    </div>
                ))}
            </Grid>
        </div>
    );
}
