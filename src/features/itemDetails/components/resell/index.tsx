import React from "react";

import styles from "./placeBidStyles.module.scss";

import Dialog from "@mui/material/Dialog";
import SvgEthIcon from "../../../svg/svgEthIcon";

export default function PlaceBid({ open, setOpen, handleClose }: any) {
  const [bid, setBid] = React.useState<number>(0.0001);

  const [saveClass, setSaveClass] = React.useState<string>("save_disable");

  React.useEffect(() => {
    if (bid) {
      setSaveClass("save");
    } else {
      setSaveClass("save_disable");
    }
  });

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
