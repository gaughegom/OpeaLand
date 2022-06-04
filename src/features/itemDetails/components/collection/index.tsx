import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./collectionStyles.module.scss";

import ViewComfySharpIcon from "@mui/icons-material/ViewComfySharp";
import Divider from "@mui/material/Divider";

import CardItem from "../../../allNFTs/components/cardItem"

import { ALL_ITEMS } from "../../../../services/APIurls";

type itemType = {
    thumbLink: string;
    id: string;
    collection: string;
    name: string;
    author: string;
    isFavorite: boolean;
    price: number;
};

export default function Collection() {
    //api
    const [items, setItem] = useState<itemType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const newItems: itemType[] = await (
                await axios.get(ALL_ITEMS)
            ).data;
            setItem(newItems);
        };

        fetchData();
    }, []);
    //----

    return (
        <div className={styles.box}>
            <div className={styles.header}>
                <ViewComfySharpIcon sx={{ fontSize: 24 }}></ViewComfySharpIcon>
                <p style={{ fontWeight: 600 }}>More items in the collection</p>
            </div>

            <Divider></Divider>

            <div className={styles.container}>
                <div className={styles.items}>
                    {items.map((item) => (
                        <div key = {item.id} className={styles.item}>
                            <CardItem
                                thumbLink={item.thumbLink}
                                id={item.id}
                                name={item.name}
                                collection={item.collection}
                                isFavorite={item.isFavorite}
                                price={item.price}
                            ></CardItem>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
