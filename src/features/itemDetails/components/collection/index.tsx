import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./collectionStyles.module.scss";

import ViewComfySharpIcon from "@mui/icons-material/ViewComfySharp";
import Divider from "@mui/material/Divider";

import CardItem from "../../../allNFTs/components/cardItem"

import { ALL_ITEMS } from "../../../../services/APIurls";
import {IItemModel} from "../../../../model/Item.model"

export default function Collection() {
    //api
    const [items, setItem] = useState<IItemModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const newItems: IItemModel[] = await (
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
                    {items.map((item,idx) => (
                        <div key = {idx} className={styles.item}>
                            <CardItem
                                thumbLink={item.thumbLink}
                                token = {item.token}
                                tokenId = {item.tokenId}
                                name={item.name}
                                collection={item.collectionName}
                                price={item.price}
                            ></CardItem>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
