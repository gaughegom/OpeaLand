import React, { useEffect, useState } from "react";

import styles from "./collectionStyles.module.scss";

import Grid from "@mui/material/Grid";

import FilterHeader from "./components/filterHeader";
import CardItem from "../allNFTs/components/cardItem";
import Criteria from "./components/criteria";

import { useAppSelector } from "../../hooks";
import { IItemModel } from "../../model/Item.model";
import { ICollectionModel } from "../../model/Collection.model";
import { ALL_ITEMS, GET_COLLECTION_BY_TOKEN, GET_ITEM_BY_TOKEN } from "../../services/APIurls";
import { http } from "../../services/AxiosHelper";
import { useParams } from "react-router-dom";

// const collection?: ICollectionModel = {
//     bannerUrl:
//         "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
//     logoUrl:
//         "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
//     name: "The Doggies (Snoop Dogg)",
//     creatorDisplayName: "Gaust",
//     description:
//         "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
//     token: "065xad34534dssfsdf4we4fdgrewdf",
//     creator: "0x3453953dsdfe34sf",
//     amount: 1453,
// };

export default function Collection() {

    const {token} = useParams()

    // handle open filter
    const open = useAppSelector((state) => state.collection.open);
    const criteriasList = useAppSelector(
        (state) => state.menuCollectionCriteria.criteriasList
    );
    //---------
    //data
    const [items, setItems] = useState<IItemModel[]>([]);
    const [collection, setCollection] = useState<ICollectionModel | undefined>(
        undefined
    );

    useEffect(() => {
        const fetchData = async () => {
            const collection: ICollectionModel = (
                await http.get(GET_COLLECTION_BY_TOKEN + `/${token}`)
            ).data[0];

            const newItems: IItemModel[] = (
                await http.get(GET_ITEM_BY_TOKEN + `/${token}`)
            ).data;

            collection.amount = newItems.length
            console.log(collection)
            setItems(newItems);
            setCollection(collection)
        };

        fetchData();
    }, []);
    //---------
    return (
        <div className={styles.page}>
            <div
                className={styles.banner}
                style={{ backgroundImage: `url(${collection?.bannerUrl})` }}
            >
                <div
                    className={styles.avt}
                    style={{ backgroundImage: `url(${collection?.logoUrl})` }}
                ></div>
            </div>
            {/* header */}
            <div className={styles.header}>
                <div className={styles.name}>{collection?.name}</div>
                <p className={styles.author}>
                    By{" "}
                    <span style={{ fontWeight: 600 }}>
                        {collection?.creatorDisplayName}
                    </span>
                </p>
                <div>{collection?.description}</div>
                <div className={styles.item}>
                    <p className={styles.amount}>
                        {collection?.amount}
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
                                            collectionName={item.collectionName}
                                            price={item.price.toString()}
                                            owner={item.owner}
                                            ownerDisplay={item.ownerDisplay}
                                            ipfsUrl={item.ipfsUrl}
                                            status={item.status}
                                            endAt={item.endAt}
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
