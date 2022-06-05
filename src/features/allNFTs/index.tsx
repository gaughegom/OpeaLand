import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import styles from "./allNFTsStyles.module.scss";

import Grid from "@mui/material/Grid";

import FilterHeader from "./components/filterHeader";
import CardItem from "./components/cardItem";
import Criteria from "./components/criteria";

import { useAppSelector } from "../../hooks";
import { ALL_ITEMS } from "../../services/APIurls";
import { IItemModel, IItemMetadataModel } from "../../../model/Item.model";

import { http } from "../../services/AxiosHelper";

export type itemType = {
    thumbLink: string;
    id: string;
    collection: string;
    name: string;
    author: string;
    isFavorite: boolean;
    price: string;
};

export default function AllNFTsPage() {
    const open = useAppSelector((state) => state.allNFTs.open);
    const criteriasList = useAppSelector(
        (state) => state.menuAllNFTsCriteria.criteriasList
    );

    //api
    const [items, setItem] = useState<itemType[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const newItems:itemType[]  = await (await axios.get(ALL_ITEMS)).data
    //         console.log(newItems)
    //         setItem(newItems)
    //     };

    //     fetchData()
    // },[])
    //-- real data
    const [apiItems, setApiItems] = useState<IItemModel[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const newItems: IItemModel[] = (
                await http.get<IItemModel[]>(ALL_ITEMS)
            ).data;
            console.log(newItems);
            setApiItems(newItems)
        };

        fetchData();
    }, []);
    //----

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
                                {apiItems !== [] &&
                                    apiItems.map((item) => (
                                        <Grid
                                            item
                                            md={open ? 4 : 3}
                                            key={item.token + item.tokenId}
                                        >
                                            <CardItem
                                                thumbLink={item.thumbLink}
                                                id={item.token + item.tokenId}
                                                name={item.name}
                                                collection={item.collectionName}
                                                //isFavorite={item.isFavorite}
                                                price={item.price}
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
