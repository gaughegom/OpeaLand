import React from "react";

import styles from "./placeBidStyles.module.scss";

import { useAppDispatch } from "../../../../hooks";
import {
  pushNotify,
  removeNotify
} from "../../../../components/Notify/notifySlice";

import Dialog from "@mui/material/Dialog";
import SvgEthIcon from "../../../svg/svgEthIcon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

export default function PlaceBid({ open, setOpen, handleClose }: any) {
  const dispatch = useAppDispatch();

  const [bid, setBid] = React.useState<number>(0.0001);

  const [endAtInput, setEndAtInput] = React.useState<Date | null>(
    new Date(Date.now())
  );
  const onChangeEndAt = (newValue: Date | null) => {
    if (newValue) {
      if (newValue < new Date(Date.now())) {
        const notify = {
          id: Date.now().toString(),
          message: "End time must greater now",
          type: "error"
        };
        dispatch(pushNotify(notify));
        setTimeout(() => {
          dispatch(removeNotify(notify));
        }, 5000);
      } else {
        setEndAtInput(newValue);
      }
    }
  };

  const [saveClass, setSaveClass] = React.useState<string>("save_disable");

  React.useEffect(() => {
    var isValidTime = false;

    if (endAtInput && endAtInput > new Date(Date.now())) {
      isValidTime = true;
    } else {
      isValidTime = false;
    }

    if (bid && isValidTime) {
      setSaveClass("save");
    } else {
      setSaveClass("save_disable");
    }
  }, [endAtInput, bid]);

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(+e.target.value);
  };
  const handlePlaceBidClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.box}>
        <div className={styles.flex}>
          <div className={styles.title}>Auction</div>

          <div className={styles.form}>
            <label className={styles.label} htmlFor="price">
              Min price
            </label>

            <div className={styles.input_box}>
              <input
                type="number"
                id="price"
                min={0.0001}
                value={bid}
                onChange={handleBidChange}
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

          <div className={styles.form}>
            <label className={styles.label} htmlFor="endAt">
              End time
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={endAtInput}
                onChange={onChangeEndAt}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div
            className={styles[saveClass]}
            onClick={saveClass === "save" ? handlePlaceBidClick : undefined}
          >
            Confirm
          </div>
        </div>
      </div>
    </Dialog>
  );
}
