import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./collectionStyles.module.scss";

import ViewComfySharpIcon from "@mui/icons-material/ViewComfySharp";
import Divider from "@mui/material/Divider";

import CardItem from "../../../allNFTs/components/cardItem"

import { ALL_ITEMS, GET_ITEM_BY_TOKEN } from "../../../../services/APIurls";
import {IItemModel} from "../../../../model/Item.model"
import { http } from "../../../../services/AxiosHelper";

export default function Collection({token}:{token:string}) {
    //api
    const [items, setItem] = useState<IItemModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const newItems: IItemModel[] = (
                await http.get(GET_ITEM_BY_TOKEN+ `/${token}`)
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
                    {items && items.map((item,idx) => (
                        <div key = {idx} className={styles.item}>
                            <CardItem
                                thumbLink={item.thumbLink}
                                token = {item.token}
                                tokenId = {item.tokenId}
                                name={item.name}
                                collectionName={item.collectionName}
                                price={item.price}
                                owner={item.owner}
                                ownerDisplay={item.ownerDisplay}
                                ipfsUrl={item.ipfsUrl}
                                status={item.status}
                                endAt={item.endAt}
                            ></CardItem>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
