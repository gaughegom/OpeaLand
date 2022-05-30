import React from "react";

import styles from "./cardItemStyles.module.scss";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";

type Props = {
    thumbLink: string;
    id: string;
    collection: string;
    name: string;
    price: number;
    isFavorite: boolean;
};

export default function CardItem(prop: Props) {
    return (
        <div className={styles.box}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${prop.thumbLink})` }}
            ></div>
            <div className={styles.info}>
                <Grid container justifyContent="space-between">
                    <Grid item md={8}>
                        <Grid container direction="column">
                            <p style={{ fontSize: 14 }}>
                                {sliceString(prop.collection, 20)}
                            </p>
                            <p style={{ fontWeight: 600, fontSize: 14 }}>
                                {sliceString(prop.name, 30)}
                            </p>
                        </Grid>
                    </Grid>
                    <Grid item md={3}>
                        <Grid
                            container
                            direction="column"
                            align-items="right"
                            style={{ textAlign: "right" }}
                        >
                            <p style={{ fontSize: 14 }}>Price</p>
                            <p style={{ fontWeight: 600 }}>
                                {prop.price}
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "normal",
                                    }}
                                >
                                    {" "}
                                    Eth
                                </span>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className={styles.action}>
                <div className={styles.button}>Buy now</div>
                <div className={styles.icon}>
                    {prop.isFavorite ? (
                        <FavoriteIcon sx={{ fontSize: 24 }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                    )}
                </div>
            </div>
        </div>
    );
}

function sliceString(input: string, numberOfLetter: number) {
    if (input.length <= numberOfLetter) {
        return input;
    }
    return input.slice(0, numberOfLetter) + "...";
}
