import React from "react";

import styles from "./placeBidStyles.module.scss";

import Dialog from "@mui/material/Dialog";
import SvgEthIcon from "../../../svg/svgEthIcon";

import ExchangeSell from "../../../../abi/contracts/exchange/ExchangeSell.sol/ExchangeSell.json";
import { contractAddresses } from "../../../../config";

import {
    UPDATE_ITEM_STATUS,
    UPDATE_ITEM_PRICE
} from "../../../../services/APIurls";
import { BigNumber, ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { http } from "../../../../services/AxiosHelper";
import { pushNotify, removeNotify } from "../../../../components/Notify/notifySlice";

export default function ReSell({ open, setOpen, handleClose, item }: any) {
    const dispatch = useAppDispatch();

    const [price, setPrice] = React.useState<number>(0.0001);

    const [saveClass, setSaveClass] = React.useState<string>("save_disable");

    React.useEffect(() => {
        if (price) {
            setSaveClass("save");
        } else {
            setSaveClass("save_disable");
        }
    });

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(+e.target.value);
    };

    const currentSigner = useAppSelector((state) => state.wallet.signer);
    const currentAddress = useAppSelector((state) => state.wallet.address);

    const handleReSellClick = async () => {
        setOpen(false);
        const exchangeSellContract = new ethers.Contract(
            contractAddresses.exchangeSell,
            ExchangeSell.abi,
            currentSigner
        );
        const token = item.token;
        const tokenId = item.tokenId;
        const weiPrice = (price * 1e18).toString();
        const txRelist = await exchangeSellContract.list(
            token,
            tokenId,
            weiPrice
        );
        const txRelistReceipt = await txRelist.wait();

        // update status api
        const resUpdateStatus = await http.put(UPDATE_ITEM_STATUS, {
            token,
            tokenId,
            status: 1
        });
        // update price api
        const resUpdatePrice = await http.put(UPDATE_ITEM_PRICE, {
            token,
            tokenId,
            price: weiPrice
        });

        console.log(resUpdatePrice);

        const notify = {
            id: Date.now().toString(),
            type: "success",
            message: "Resell item successfully.",
        };
        dispatch(pushNotify(notify));
        setTimeout(() => {
            dispatch(removeNotify(notify));
        }, 5000);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className={styles.box}>
                <div className={styles.flex}>
                    <div className={styles.title}>Sell</div>

                    <div className={styles.form}>
                        <label className={styles.label} htmlFor="price">
                            Price
                        </label>

                        <div className={styles.input_box}>
                            <input
                                type="number"
                                id="price"
                                min={0.0001}
                                value={price}
                                onChange={handlePriceChange}
                                className={styles.input}
                            ></input>
                            <span>
                                <SvgEthIcon
                                    style={{
                                        marginRight: "8px",
                                        width: "16px",
                                        height: "16px"
                                    }}
                                />
                            </span>
                        </div>
                    </div>

                    <div
                        className={styles[saveClass]}
                        onClick={
                            saveClass === "save" ? handleReSellClick : undefined
                        }
                    >
                        Confirm
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
