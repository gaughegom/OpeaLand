import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./cardItemStyles.module.scss";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SvgIcon from "@mui/material/SvgIcon";
import { Grid } from "@mui/material";

import { ethers } from "ethers";
import SvgEthIcon from "../../../svg/svgEthIcon";

type Props = {
    thumbLink: string;
    token: string;
    tokenId: string;
    collection: string;
    name: string;
    price: string;
    isFavorite?: boolean;
};

export default function CardItem(prop: Props) {
    const navigate = useNavigate();

    return (
        <div
            className={styles.box}
            onClick={() => {
                navigate(`/collection/${prop.token}/item/${prop.tokenId}`);
            }}
        >
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
                    <Grid item md={4}>
                        <Grid
                            container
                            direction="column"
                            align-items="right"
                            style={{ textAlign: "right" }}
                        >
                            <p style={{ fontSize: 14 }}>Price</p>
                            <div>
                                <span>
                                    <SvgEthIcon  style={{marginRight: '8px', width:"16px",  height:"16px"}}/>
                                </span>
                                {ethers.utils.formatEther(prop.price)}
                            </div>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {/* <div className={styles.action}>
                <div className={styles.button}>Buy now</div>
                <div className={styles.icon}>
                    {prop.isFavorite ? (
                        <FavoriteIcon sx={{ fontSize: 24 }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                    )}
                </div>
            </div> */}
        </div>
    );
}

function sliceString(input: string, numberOfLetter: number) {
    if (input.length <= numberOfLetter) {
        return input;
    }
    return input.slice(0, numberOfLetter) + "...";
}
