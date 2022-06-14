import React, { useEffect, useState } from "react";

import styles from "./collectionStyles.module.scss";

import Grid from "@mui/material/Grid";

import FilterHeader from "./components/filterHeader";
import CardItem from "../allNFTs/components/cardItem";
import Criteria from "./components/criteria";

import { useAppSelector } from "../../hooks";
import { IItemModel } from "../../../model/Item.model";
import { ALL_ITEMS } from "../../services/APIurls";
import { http } from "../../services/AxiosHelper";

export default function Collection() {
    // handle open filter
    const open = useAppSelector((state) => state.collection.open);
    const criteriasList = useAppSelector(
        (state) => state.menuCollectionCriteria.criteriasList
    );
    //---------
    //data
    const [items, setItem] = useState<IItemModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const newItems: IItemModel[] = await (
                await http.get(ALL_ITEMS)
            ).data;
            setItem(newItems);
        };

        fetchData();
    }, []);
    //---------
    return (
        <div className={styles.page}>
            <div
                className={styles.banner}
                // style={{ backgroundImage: `url(${data.collectionImg})` }}
            >
                <div
                    className={styles.avt}
                    // style={{ backgroundImage: `url(${data.author.avt})` }}
                ></div>
            </div>
            {/* header */}
            <div className={styles.header}>
                <div className={styles.name}>{"Collection Name"}</div>
                <p className={styles.author}>
                    By{" "}
                    <span style={{ fontWeight: 600 }}>{"Collection Name"}</span>
                </p>
                <div>{"Collection Descript"}</div>
                <div className={styles.item}>
                    <p className={styles.amount}>
                        {"Collection Amount"}
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
                                {items.map((item, index) => (
                                    <Grid item md={open ? 4 : 3} key={index}>
                                        <CardItem
                                            thumbLink={item.thumbLink}
                                            token={item.token}
                                            tokenId={item.tokenId}
                                            name={item.name}
                                            collection={item.collectionName}
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
