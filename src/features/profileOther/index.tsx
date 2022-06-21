import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import moment from "moment";

import styles from "./profileOtherStyles.module.scss";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import CardItem from "../allNFTs/components/cardItem";

import { ALL_ITEMS } from "../../services/APIurls";
import Grid from "@mui/material/Grid";

import { validateEmail, validateUserName } from "./helper";

import { IItemModel } from "../../model/Item.model";

const user = {
    name: "John",
    address: "0xEE2552070EC5C7D73745D63BB2f50d9089593b65",
    joined: "4-20-2022",
    cover: "https://lh3.googleusercontent.com/Xr3fiIUsW7MFizYceyVzwKMIkA62X5b00JpALnIQT839mOkbGEtfJRYEV1rLB_JHGzwsKlFRSAUZdCUm1KgQgQQmSdvWOv_eHkCc0A=h600",
    avt: "https://lh3.googleusercontent.com/GZ0mR0bDWG37xNN2aHU1Pbw7x6vP1ffOE3uIWRz0RgmUPuoNJ1x88XnMIzen8DzgniR1QRTkDBAy8IwLFKSf-V6cinr4I-Vqof_XbII=s168",
    created: [],
    collected: [],
};

export default function Profile() {
    // indicator
    const [indicators, setIndicators] = useState([
        { title: "Collected", value: 1, isActive: true },
        { title: "Created", value: 2, isActive: false },
    ]);
    const [currentIndicator, setCurrentIndicator] = useState(1);

    const handleActive = (index: number) => {
        const newIndicators = indicators.map((item) => {
            if (item.value === index) {
                return { ...item, isActive: true };
            }
            return { ...item, isActive: false };
        });
        setIndicators(newIndicators);
        setCurrentIndicator(index);
    };
    //------------------------
    //container
    const noItem = (
        <div className={styles.noItem}>
            <div>No item to display</div>
        </div>
    );
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
    const navigate = useNavigate();
    //------
    return (
        <div>
            {/* banner */}
            <div className={styles.banner}>
                <div
                    className={styles.bannerChild}
                    style={{ backgroundImage: `url(${user.cover})` }}
                ></div>
                <div
                    className={styles.avt}
                    style={{ backgroundImage: `url(${user.avt})` }}
                ></div>
            </div>
            {/* grid */}
            <div className={styles.grid}>
                {/* header */}
                <div className={styles.info}>
                    <div className={styles.name}>{user.name}</div>
                    <div
                        className={styles.address}
                        onClick={() =>
                            navigator.clipboard.writeText(user.address)
                        }
                    >
                        <div>{user.address}</div>
                        <ContentCopyIcon
                            sx={{ fontSize: 20 }}
                        ></ContentCopyIcon>
                    </div>

                    <div className={styles.joined}>
                        Joined {formatTime(user.joined).toString()}
                    </div>
                </div>
                {/* tabpanel */}
                <div className={styles.tabs}>
                    <div className={styles.indicators}>
                        {indicators.map((item, idx) => {
                            return (
                                <div
                                    onClick={(e) => handleActive(item.value)}
                                    className={
                                        styles[
                                            `indicator${
                                                item.isActive ? "_active" : ""
                                            }`
                                        ]
                                    }
                                    key={idx}
                                >
                                    <div>{item.title}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.container}>
                        {currentIndicator === 1 && (
                            <div>
                                {user.collected !== [] ? (
                                    <Grid item>
                                        <Grid
                                            container
                                            rowSpacing={2}
                                            columnSpacing={2}
                                            className={styles.boxItem}
                                        >
                                            {items.map((item, idx) => (
                                                <Grid item md={3} key={idx}>
                                                    <CardItem
                                                        thumbLink={
                                                            item.thumbLink
                                                        }
                                                        token={item.token}
                                                        tokenId={item.tokenId}
                                                        name={item.name}
                                                        collectionName={
                                                            item.collectionName
                                                        }
                                                        price={item.price}
                                                        owner={item.owner}
                                                        ownerDisplay={
                                                            item.ownerDisplay
                                                        }
                                                        ipfsUrl={item.ipfsUrl}
                                                        status={item.status}
                                                        endAt={item.endAt}
                                                    ></CardItem>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                ) : (
                                    noItem
                                )}
                            </div>
                        )}

                        {/* {currentIndicator === 2 && (
                            <div>
                                {mockAPI !== [] ? (
                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={2}
                                    >
                                        {mockAPI.map((item, index) => (
                                            <Grid item md={4} key={index}>
                                                <CardItemCollection
                                                    {...item}
                                                    onClick={() =>
                                                        navigate(
                                                            `${COLLECTION_PATH}/${item.id}`
                                                        )
                                                    }
                                                ></CardItemCollection>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    noItem
                                )}
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const formatTime = (timeString: string) => {
    return moment(timeString).format("MMMM Do YYYY");
};
