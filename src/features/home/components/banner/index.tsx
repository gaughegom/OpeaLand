import React from "react";

import styles from "./bannerStyles.module.scss";

import Grid from "@mui/material/Grid";

import HotCollection from "./components/hotCollection";

type Props = {
    imgUrl: string;
    description: {
        avt: string;
        author: string;
        name: string;
    };
};

export default function Banner({ imgUrl, description }: Props) {
    return (
        <div className={styles.box}>
            <div
                className={styles.banner}
                style={{ backgroundImage: `url(${imgUrl})` }}
            ></div>
            <Grid
                container
                direction="row"
                wrap="wrap"
                className={styles.container}
            >
                <div className={styles.left}>
                    <p style={{ fontSize: 45, fontWeight: 600 }}>
                        Discover, collect, and sell extraordinary NFTs
                    </p>
                    <p style={{ fontSize: 24, fontWeight: "normal" }}>
                        OpenSea is the world's first and largest NFT marketplace
                    </p>
                    <div className={styles.buttonArea}>
                        <button className={styles.exploreButton}>Explore</button>
                        <button className={styles.rankingsButton}>Rankings</button>
                    </div>
                </div>
                <HotCollection
                    imgUrl={imgUrl}
                    description={description}
                ></HotCollection>
            </Grid>
        </div>
    );
}
