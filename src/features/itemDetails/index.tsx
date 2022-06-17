import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./itemDetailsStyles.module.scss";

import Divider from "@mui/material/Divider";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BallotIcon from "@mui/icons-material/Ballot";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import Collection from "./components/collection";
import PlaceBid from "./components/placeBid";
import Buy from "./components/buy";

import { IItemModel, IItemMetadataModel } from "../../model/Item.model";
import { http } from "../../services/AxiosHelper";
import { ALL_ITEMS } from "../../services/APIurls";
import formatAddress from "../../utils/formatAddress";
import SvgEthIcon from "../svg/svgEthIcon";
import { ethers } from "ethers";
import ListIcon from '@mui/icons-material/List'

const ITEM_STATUS = {
    BID: "bid",
    SALE: "sale",
    NULL: "null",
};

const mockAPI = {
    thumbLink:
        "https://lh3.googleusercontent.com/hUJ0MXZxg0KAPc_59PllzGK2hZ68QjkfaRdHNwLSTHMtqlEhn3QJpEv71FVgpRZweMvCQFDP4uyDpMAx0Mg4_4kr6ux-20WmXlfFYQ=w600",
    id: "1",
    collection: "Holy-Ghosts",
    name: "Holy Ghost #1986",
    author: "Ghost-Maker",
    isFavorite: true,
    price: 0.008,
    status: "sale",
    saleEnd: "6/3/2022",
    description:
        "Using your past experiences, evolve to become the best version of yourself in the present, taking each moment in time as a gift.",
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
    const params = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<IItemModel>();

    const [openPlaceBid, setOpenPlaceBid] = useState<boolean>(false);
    const [pricePlaceBid, setPricePlaceBid] = useState<number>(0);
    const [openBuy, setOpenBuy] = useState<boolean>(false);

    const handleClosePlaceBid = () => {
        setOpenPlaceBid(false);
    };
    const handleOpenPlaceBid = () => {
        setOpenPlaceBid(true);
    };
    const handleOpenBuy = () => setOpenBuy(true);
    const handleCloseBuy = () => setOpenBuy(false);

    useEffect(() => {
        const fetchData = async () => {
            const newItem: IItemModel = (
                await http.get<IItemModel[]>(
                    ALL_ITEMS +
                        `?token=${params.token}&tokenId=${params.tokenId}`
                )
            ).data[0];
            if (newItem) {
                const newMetaData: IItemMetadataModel = (
                    await http.get<IItemMetadataModel>(newItem.ipfsUrl!)
                ).data;
                newItem.metadata = newMetaData;
                setItem(newItem);
            }
        };

        fetchData();
    }, [params]);

    return (
        <div className={styles.page}>
            <div className={styles.grid}>
                <div className={styles.left}>
                    <div
                        className={styles.img}
                        style={{ backgroundImage: `url(${item?.thumbLink})` }}
                    ></div>
                    <div className={styles.info}>
                        <div className={styles.description}>
                            <div className={styles.title}>
                                <FormatAlignJustifyIcon
                                    sx={{ fontSize: 24 }}
                                ></FormatAlignJustifyIcon>
                                <div>Description</div>
                            </div>
                            <Divider></Divider>
                            <div className={styles.content}>
                                {item?.metadata.description}
                            </div>
                        </div>

                        <Divider></Divider>

                        <div className={styles.details}>
                            <div className={styles.title}>
                                <BallotIcon sx={{ fontSize: 24 }} />
                                <div>Details</div>
                            </div>
                            <Divider></Divider>
                            <div className={styles.content}>
                                <div className={styles.row}>
                                    <div>Contact address</div>
                                    <div>{formatAddress(item?.token)}</div>
                                </div>
                                <div className={styles.row}>
                                    <div>Token ID</div>
                                    <div>{formatAddress(item?.tokenId)}</div>
                                </div>
                            </div>
                        </div>

                        <Divider></Divider>

                        <div className={styles.details}>
                            <div className={styles.title}>
                            <ListIcon sx={{ fontSize: 24 }} />

                                <div>Properties</div>
                            </div>
                            <Divider></Divider>
                            <div className={styles.content}>
                                <div className={styles.row}>
                                    <div>Contact address</div>
                                    <div>{formatAddress(item?.token)}</div>
                                </div>
                                <div className={styles.row}>
                                    <div>Token ID</div>
                                    <div>{formatAddress(item?.tokenId)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className={styles.right}>
                    <div
                        onClick={() => {
                            navigate(`/collection/${item?.token}`);
                        }}
                        className={styles["collection-name"]}
                    >
                        {item?.collectionName}
                    </div>
                    <div className={styles["name"]}>{item?.name}</div>
                    <p className={styles["author"]}>
                        Owned by{" "}
                        <span
                            style={{ color: "var(--primaryColor)" }}
                            className={styles.link}
                        >
                            {!item?.ownerDisplay
                                ? formatAddress(item?.owner)
                                : item?.ownerDisplay}
                        </span>
                    </p>

                    <div className={styles["box-buynow"]}>
                        {item?.status !== ITEM_STATUS.NULL && (
                            <React.Fragment>
                                <div className={styles.saleEnd}>
                                    Sale end at {item?.endAt.toString()}
                                </div>
                                <Divider></Divider>
                            </React.Fragment>
                        )}
                        <div className={styles.buttonArea}>
                            <div className={styles.price}>
                                <div
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "normal",
                                    }}
                                >
                                    {item?.status === ITEM_STATUS.SALE
                                        ? "Current price"
                                        : "Minimum bid"}
                                </div>
                                <div>
                                    {item &&
                                        ethers.utils.formatEther(
                                            item.price
                                        )}{" "}
                                    <span>
                                        <SvgEthIcon
                                            style={{
                                                marginRight: "8px",
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>

                            <div
                                className={styles.button}
                                onClick={handleOpenBuy}
                            >
                                <AccountBalanceWalletIcon
                                    sx={{ fontSize: 28 }}
                                ></AccountBalanceWalletIcon>
                                <div>
                                    {item?.status === ITEM_STATUS.SALE
                                        ? "Buy now"
                                        : "Place bid"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className={styles.boxPriceList}>
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
                    </div> */}
                </div>
            </div>

            <Collection></Collection>

            <div className={styles.viewCollection}>
                <div className={styles.button}>View collection</div>
            </div>

            {item && (
                <PlaceBid
                    open={openPlaceBid}
                    setOpen={setOpenPlaceBid}
                    handleClose={handleClosePlaceBid}
                    price={pricePlaceBid}
                    setPrice={setPricePlaceBid}
                    minBid={ethers.utils.formatEther(item ? item.price : "0")}
                />
            )}
            {item && (
                <Buy
                    open={openBuy}
                    handleClose={handleCloseBuy}
                    setOpen={setOpenBuy}
                    item={item}
                ></Buy>
            )}
        </div>
    );
}
