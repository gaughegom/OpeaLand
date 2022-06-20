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
import { IItemModel, IItemMetadataModel } from "../../model/Item.model";

import { http } from "../../services/AxiosHelper";

const mockAPIsItem: IItemModel[] = [
    {
        token: "0xa041cd6a29b51ea150c1df09190d460e4a8f69fa",
        tokenId: "1",
        price: "12000000000000000000",
        // creator: "0x473555075d70a736788dcfcd7ca2901870cc575e",
        owner: "0x8995fcfa937a4bd874b47855d4f86d506ce9d3fc",
        ownerDisplay: "Joner",
        ipfsUrl: "https://6297612314e756fe3b2e98ee.mockapi.io/api/ipfs/1",
        status: "Sell",
        thumbLink: "http://loremflickr.com/640/480/abstract",
        collectionName: "Emerson",
        name: "Amos Daugherty",
        endAt: "2083-06-25T15:24:21.037Z",
    },
    {
        token: "0xa041cd6a29b51ea150c1df09190d460e4a8f69fa",
        tokenId: "2",
        price: "12000000000000000000",
        // creator: "0x473555075d70a736788dcfcd7ca2901870cc575e",
        owner: "0x8995fcfa937a4bd874b47855d4f86d506ce9d3fc",
        ownerDisplay: "Gausts",
        ipfsUrl: "https://6297612314e756fe3b2e98ee.mockapi.io/api/ipfs/1",
        status: "Sell",
        thumbLink: "http://loremflickr.com/640/480/abstract",
        collectionName: "Emerson",
        name: "Amos Daugherty",
        endAt: "2083-06-25T15:24:21.037Z",
    },
    {
        token: "0xa041cd6a29b51ea150c1df09190d460e4a8f69fa",
        tokenId: "3",
        price: "12000000000000000000",
        // creator: "0x473555075d70a736788dcfcd7ca2901870cc575e",
        owner: "0x8995fcfa937a4bd874b47855d4f86d506ce9d3fc",
        ownerDisplay: "Baed",
        ipfsUrl: "https://6297612314e756fe3b2e98ee.mockapi.io/api/ipfs/1",
        status: "Sell",
        thumbLink: "http://loremflickr.com/640/480/abstract",
        collectionName: "Emerson",
        name: "Amos Daugherty",
        endAt: "2083-06-25T15:24:21.037Z",
    },
];

export default function AllNFTsPage() {
    const open = useAppSelector((state) => state.allNFTs.open);
    const criteriasList = useAppSelector(
        (state) => state.menuAllNFTsCriteria.criteriasList
    );

    //-- real data
    // const [apiItems, setApiItems] = useState<IItemModel[]>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const newItems: IItemModel[] = (
    //             await http.get<IItemModel[]>(ALL_ITEMS)
    //         ).data;
    //         setApiItems(newItems);
    //     };

    //     fetchData();
    // }, []);
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
                                {mockAPIsItem !== [] &&
                                    mockAPIsItem.map((item) => (
                                        <Grid
                                            item
                                            md={open ? 4 : 3}
                                            key={item.token + item.tokenId}
                                        >
                                            <CardItem
                                                thumbLink={item.thumbLink}
                                                tokenId={item.tokenId}
                                                token={item.token}
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
