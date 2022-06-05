import React from "react";

import styles from "./collectionStyles.module.scss";

import Grid from "@mui/material/Grid";

import FilterHeader from "./components/filterHeader";
import CardItem from "../allNFTs/components/cardItem";
import Criteria from "./components/criteria";

import { useAppSelector } from "../../hooks";

const data = {
    collectionImg:
        "https://lh3.googleusercontent.com/BSggcaM3RbfXxiHnnWtO97FMZr6Amu8QgzQQI3xV8oTxj1tcMSOLEMdf_CtEwHaGiruYy9bVXKPa9LRSJcZD9kbKfMfPZicbk-KD=h600",
    collectionName: "Akumu Dragonz",
    author: {
        avt: "https://lh3.googleusercontent.com/cDfIiQMlap3KmoLnlgridUvdhfGDCXVosa5zURHQNMES_r0otI8MEkUtqFUN7pKkr9U-3ItBTp1XKLg7ScxvziOBfbDd706q9eGS=s168",
        name: "Akumu-Dragonz",
    },
    items: [
        {
            thumbLink:
                "https://lh3.googleusercontent.com/OtwsraXoy_DaUz-JDT6bSuz9WF5O_BY5_iX_Is4Hxn3dyGgtiJ8jLcEWVmrzB3tXKzHvEGJv5sNbDRZWIJDiBMh0ulkrfYseHhIwcw=w300",
            id: "",
            collection: "Collection Collection Collection",
            name: "AB Name Name Name Name Name Name",
            price: 123,
            isFavorite: false,
        },
        {
            thumbLink:
                "https://lh3.googleusercontent.com/OtwsraXoy_DaUz-JDT6bSuz9WF5O_BY5_iX_Is4Hxn3dyGgtiJ8jLcEWVmrzB3tXKzHvEGJv5sNbDRZWIJDiBMh0ulkrfYseHhIwcw=w300",
            id: "",
            collection: "Collection Collection Collection",
            name: "AB Name Name Name Name Name Name",
            price: 123,
            isFavorite: false,
        },
        {
            thumbLink:
                "https://lh3.googleusercontent.com/OtwsraXoy_DaUz-JDT6bSuz9WF5O_BY5_iX_Is4Hxn3dyGgtiJ8jLcEWVmrzB3tXKzHvEGJv5sNbDRZWIJDiBMh0ulkrfYseHhIwcw=w300",
            id: "",
            collection: "Collection Collection Collection",
            name: "AB Name Name Name Name Name Name",
            price: 123,
            isFavorite: false,
        },
        {
            thumbLink:
                "https://lh3.googleusercontent.com/OtwsraXoy_DaUz-JDT6bSuz9WF5O_BY5_iX_Is4Hxn3dyGgtiJ8jLcEWVmrzB3tXKzHvEGJv5sNbDRZWIJDiBMh0ulkrfYseHhIwcw=w300",
            id: "",
            collection: "Collection Collection Collection",
            name: "AB Name Name Name Name Name Name",
            price: 123,
            isFavorite: false,
        },
        {
            thumbLink:
                "https://lh3.googleusercontent.com/OtwsraXoy_DaUz-JDT6bSuz9WF5O_BY5_iX_Is4Hxn3dyGgtiJ8jLcEWVmrzB3tXKzHvEGJv5sNbDRZWIJDiBMh0ulkrfYseHhIwcw=w300",
            id: "",
            collection: "Collection Collection Collection",
            name: "AB Name Name Name Name Name Name",
            price: 123,
            isFavorite: false,
        },
    ],
    amount: 200,
    description:
        "Welcome to our aquarium! Check out various unique and beautiful tropical fish here. If you ever need to find a fish to keep you company or set up the best aquarium for your own, this may be the best spot to find one. Welcome to our aquarium! Check out various unique and beautiful tropical fish here. If you ever need to find a fish to keep you company or set up the best aquarium for your own, this may be the best spot to find one.",
};

export default function Collection() {
    // handle open filter
    const open = useAppSelector((state) => state.collection.open);
    const criteriasList = useAppSelector(
        (state) => state.menuCollectionCriteria.criteriasList
    );
    //---------
    return (
        <div className={styles.page}>
            <div
                className={styles.banner}
                style={{ backgroundImage: `url(${data.collectionImg})` }}
            >
                <div
                    className={styles.avt}
                    style={{ backgroundImage: `url(${data.author.avt})` }}
                ></div>
            </div>
            {/* header */}
            <div className={styles.header}>
                <div className={styles.name}>{data.collectionName}</div>
                <p className={styles.author}>
                    By{" "}
                    <span style={{ fontWeight: 600 }}>
                        {data.collectionName}
                    </span>
                </p>
                <div>{data.description}</div>
                <div className={styles.item}>
                    <p className={styles.amount}>
                        {data.amount}
                        <span
                            style={{ fontSize: 16, color: "rgb(112 122 131)" }}
                        >
                            {" "}
                            Items
                        </span>
                    </p>
                </div>
            </div>

            {/* filter */}
            <FilterHeader></FilterHeader>

            <Grid container direction="row" className={styles.grid}>
                <Grid item md={3} display={open ? "block" : "none"}></Grid>
                <Grid item md>
                    <Grid container direction="column">
                        <Grid item>
                            {!criteriasList.every((item) => !item.checked) && (
                                <Criteria></Criteria>
                            )}
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                rowSpacing={2}
                                columnSpacing={2}
                                className={styles.boxItem}
                            >
                                {data.items.map((item, index) => (
                                    <Grid item md={open ? 4 : 3} key={index}>
                                        <CardItem
                                            thumbLink={item.thumbLink}
                                            id={item.id}
                                            name={item.name}
                                            collection={item.collection}
                                            isFavorite={item.isFavorite}
                                            price={item.price.toString()}
                                        ></CardItem>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
