import React from "react";

import styles from "./placeBidStyles.module.scss";

import Dialog from "@mui/material/Dialog";
import SvgEthIcon from "../../../svg/svgEthIcon";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

import { contractAddresses } from "../../../../config";

import Exchange from "../../../../abi/contracts/exchange/Exchange.sol/Exchange.json";
import { useAppSelector } from "../../../../hooks";
import { ethers } from "ethers";
import { http } from "../../../../services/AxiosHelper";
import { UPDATE_ITEM_PRICE } from "../../../../services/APIurls";

const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 5,
    width: 24,
    height: 24,
    boxShadow:
        theme.palette.mode === "dark"
            ? "0 0 0 1px rgb(16 22 26 / 40%)"
            : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundImage:
        theme.palette.mode === "dark"
            ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
            : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2
    },
    "input:disabled ~ &": {
        boxShadow: "none",
        background:
            theme.palette.mode === "dark"
                ? "rgba(57,75,89,.5)"
                : "rgba(206,217,224,.5)"
    }
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#137cbd",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
        display: "block",
        width: 24,
        height: 24,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""'
    },
    "input:hover ~ &": {
        backgroundColor: "#106ba3"
    }
});
export default function PlaceBid({
    open,
    setOpen,
    handleClose,
    price,
    setPrice,
    minBid,
    item
}: any) {
    const [isChecked, setIsChecked] = React.useState(false);
    const [bid, setBid] = React.useState<string>("0");

    const [saveClass, setSaveClass] = React.useState<string>("save_disable");

    React.useEffect(() => {
        if (bid && +bid > +minBid && isChecked) {
            setSaveClass("save");
        } else {
            setSaveClass("save_disable");
        }
    });

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBid(e.target.value);
    };
    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const currentSigner = useAppSelector((state) => state.wallet.signer);
    const handlePlaceBidClick = async () => {
        setPrice(bid);
        setOpen(false);

        const exchangeContract = new ethers.Contract(
            contractAddresses.exchange,
            Exchange.abi,
            currentSigner
        );

        const token = item.token;
        const tokenId = item.tokenId;

        console.log(await exchangeContract.auctionsParam);
        const weiPrice = (parseFloat(bid) * 1e18).toString();
        const txBid = await exchangeContract.bid(token, tokenId, {
            value: weiPrice
        });
        console.log(txBid);
        const txBidReceipt = await txBid.wait();
        console.log(txBidReceipt);

        // call api update price
        const resUpdatePrice = await http.put(UPDATE_ITEM_PRICE, {
            token,
            tokenId,
            price: weiPrice
        });
        console.log("call api", resUpdatePrice);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className={styles.box}>
                <div className={styles.flex}>
                    <div className={styles.title}>Place a bid</div>

                    <div className={styles.form}>
                        <label className={styles.label} htmlFor="bid">
                            Offer amount
                        </label>

                        <div className={styles.input_box}>
                            <input
                                type="number"
                                id="bid"
                                value={bid}
                                onChange={handleBidChange}
                                min={+minBid}
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

                    <div className={styles.term}>
                        <Checkbox
                            checked={isChecked}
                            onChange={handleCheck}
                            sx={{
                                "&:hover": { bgcolor: "transparent" }
                            }}
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                            id="agree"
                        />
                        <label htmlFor="agree">
                            I agree to OpenLand's Terms of Service
                        </label>
                    </div>

                    <div
                        className={styles[saveClass]}
                        onClick={
                            saveClass === "save"
                                ? handlePlaceBidClick
                                : undefined
                        }
                    >
                        Place bid
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
