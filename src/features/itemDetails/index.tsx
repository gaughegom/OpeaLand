import React from "react";

import styles from "./itemDetailsStyles.module.scss";

import Divider from "@mui/material/Divider";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BallotIcon from "@mui/icons-material/Ballot";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import Collection from "./components/collection";

const mockAPI = {
    thumbLink:
        "https://lh3.googleusercontent.com/hUJ0MXZxg0KAPc_59PllzGK2hZ68QjkfaRdHNwLSTHMtqlEhn3QJpEv71FVgpRZweMvCQFDP4uyDpMAx0Mg4_4kr6ux-20WmXlfFYQ=w600",
    id: "1",
    collection: "Holy-Ghosts",
    name: "Holy Ghost #1986",
    author: "Ghost-Maker",
    isFavorite: true,
    price: 0.008,
    saleEnd: "6/3/2022",
    description: "Using your past experiences, evolve to become the best version of yourself in the present, taking each moment in time as a gift.",
    detail: {
        contractAddress: "0x5bd8dff9",
        tokenID: "1",
        creatorFees: "5%",
    },
    priceHistory: [
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
        {
            price: 0.007,
            time: "6/2/2022",
            owner: "Ghost-Maker",
        },
    ],
};

export default function Item() {
    return (
        <div className={styles.page}>
            <div className={styles.grid}>
                <div className={styles.left}>
                    <div
                        className={styles.img}
                        style={{ backgroundImage: `url(${mockAPI.thumbLink})` }}
                    ></div>
                    <div className={styles.info}>
                        <div className={styles.description}>
                            <div className={styles.title}>
                                <FormatAlignJustifyIcon sx={{ fontSize: 24 }}></FormatAlignJustifyIcon>
                                <div>Description</div>
                            </div>
                            <Divider></Divider>
                            <div className = {styles.content}>{mockAPI.description}</div>
                        </div>

                        <Divider></Divider>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <BallotIcon sx={{ fontSize: 24 }} />
                                <div>Description</div>
                            </div>
                            <Divider></Divider>
                            <div className = {styles.content}>
                                <div className={styles.row}><div>Contact address</div><div>{mockAPI.detail.contractAddress}</div></div>
                                <div className={styles.row}><div>Token ID</div><div>{mockAPI.detail.tokenID}</div></div>
                                <div className={styles.row}><div>Creator fees</div><div>{mockAPI.detail.creatorFees}</div></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className={styles.right}>
                    <div className={styles["collection-name"]}>
                        {mockAPI.collection}
                    </div>
                    <div className={styles["name"]}>{mockAPI.name}</div>
                    <p className={styles["author"]}>
                        Owned by{" "}
                        <span style={{ color: "var(--primaryColor)" }}>
                            {mockAPI.author}
                        </span>
                    </p>

                    <div className={styles["box-buynow"]}>
                        <div className={styles.saleEnd}>
                            Sale end at {mockAPI.saleEnd}
                        </div>
                        <Divider></Divider>
                        <div className={styles.buttonArea}>
                            <div className={styles.price}>
                                <div
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "normal",
                                    }}
                                >
                                    Current price
                                </div>
                                <div>{mockAPI.price} Eth</div>
                            </div>

                            <div className={styles.button}>
                                <AccountBalanceWalletIcon
                                    sx={{ fontSize: 28 }}
                                ></AccountBalanceWalletIcon>
                                <div>Buy now</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.boxPriceList}>
                        <div className={styles.title}>
                            <ShowChartIcon
                                sx={{ fontSize: 24 }}
                            ></ShowChartIcon>
                            <div>Price History</div>
                        </div>
                        <Divider></Divider>
                        <div className={styles.chartArea}>
                            <div className={styles.scrollable}>
                                {mockAPI.priceHistory.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className={styles.priceRow}
                                        >
                                            <div>{item.price}</div>
                                            <div>{item.owner}</div>
                                            <div>{item.time}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Collection></Collection>

            <div className={styles.viewCollection}>
                <div className={styles.button}>View collection</div>
            </div>
        </div>
    );
}
