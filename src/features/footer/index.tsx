import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./footerStyles.module.scss";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function Footer() {
    const navigate = useNavigate();

    const exploreItem = [
        {
            title: "All NFTs",
            path: "",
        },
        {
            title: "Collectibles",
            path: "",
        },
    ];

    const userItem = [
        {
            title: "Profile",
            path: "",
        },
        {
            title: "Favories",
            path: "",
        },
        {
            title: "My Collections",
            path: "",
        },
    ];

    return (
        <Grid container direction="column" className={styles.footer}>
            <Grid container direction="row" className={styles.nav}>
                <Grid item md={4}>
                    <Grid container direction="column" className={styles.left}>
                        <div className={styles.logo}></div>
                        <div className={styles.name}>OpenLand</div>
                        <div className={styles.description}>
                            The world’s first and largest digital marketplace
                            for crypto collectibles and non-fungible tokens
                            (NFTs). Buy, sell, and discover exclusive digital
                            items.
                        </div>
                    </Grid>
                </Grid>
                <Grid item md={2} className={styles.right}>
                    <Grid className={styles.header}>Marketplace</Grid>
                    <Grid container direction="column" className={styles.body}>
                        {exploreItem.map((item, idx) => (
                            <div key={idx} onClick={() => navigate(item.path)}>
                                {item.title}
                            </div>
                        ))}
                    </Grid>
                </Grid>
                <Grid item md={2} className={styles.right}>
                    <Grid className={styles.header}>Marketplace</Grid>
                    <Grid container direction="column" className={styles.body}>
                        {userItem.map((item, idx) => (
                            <div key={idx} onClick={() => navigate(item.path)}>
                                {item.title}
                            </div>
                        ))}
                    </Grid>
                </Grid>
                <Grid item md={2}>
                </Grid>
            </Grid>

            <Divider className={styles.divider}></Divider>

            <Grid container direction="row" className={styles.copyright}>
                <Grid item>© 2022 Thang & Hung</Grid>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        className={styles["right-float"]}
                    >
                        <Grid>Privacy Policy</Grid>
                        <Grid>Terms of Service</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
