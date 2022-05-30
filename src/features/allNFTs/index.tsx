import React from "react";

import styles from "./allNFTsStyles.module.scss";

import Grid from "@mui/material/Grid";

import FilterHeader from "./components/filterHeader";
import CardItem from "./components/cardItem";
import Criteria from "./components/criteria";

import { useAppSelector } from "../../hooks";

const mockAPI = {
    thumbLink:
        "https://lh3.googleusercontent.com/OtwsraXoy_DaUz-JDT6bSuz9WF5O_BY5_iX_Is4Hxn3dyGgtiJ8jLcEWVmrzB3tXKzHvEGJv5sNbDRZWIJDiBMh0ulkrfYseHhIwcw=w300",
    id: "",
    collection: "Collection Collection Collection",
    name: "AB Name Name Name Name Name Name",
    price: 123,
    isFavorite: false,
};
export default function AllNFTsPage() {
    const open = useAppSelector((state) => state.allNFTs.open);
    const criteriasList = useAppSelector(
        (state) => state.menuCriteria.criteriasList
    );

    return (
        <React.Fragment>

            <FilterHeader />

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
                                {Array.from(Array(20)).map((_, index) => (
                                    <Grid item md={open ? 4 : 3} key={index}>
                                        <CardItem
                                            thumbLink={mockAPI.thumbLink}
                                            id = {mockAPI.id}
                                            name = {mockAPI.name}
                                            collection = {mockAPI.collection}
                                            isFavorite = {mockAPI.isFavorite} 
                                            price = {mockAPI.price}
                                        ></CardItem>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
