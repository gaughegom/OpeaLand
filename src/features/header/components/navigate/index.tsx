import * as React from "react";

import styles from "./navigateStyles.module.scss";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GridOnIcon from "@mui/icons-material/GridOn";

export default function Navigate() {
    const exploreItem = [
        {
            iconLink:
                "https://opensea.io/static/images/icons/allnfts-light.svg",
            title: "All NFTs",
            path: "",
        },
        {
            iconLink:
                "https://opensea.io/static/images/icons/collectibles-light.svg",
            title: "Collectibles",
            path: "",
        },
    ];
    const statsItem = [
        { title: "Rankings", path: "" },
        { title: "Activities", path: "" },
    ];

    const userItem = [
        {
            iconLink: <PersonIcon sx={{ fontSize: 24 }} />,
            title: "Profile",
        },
        {
            iconLink: <FavoriteBorderIcon sx={{ fontSize: 24 }} />,
            title: "Favories",
        },
        {
            iconLink: <GridOnIcon sx={{ fontSize: 24 }} />,
            title: "My Collections",
        },
    ];
    const walletItem = [{ iconLink: "", title: "" }];

    return (
        <div className={styles.navigate}>
            <div className={styles.item}>
                <p>Explore</p>
                <div className={styles["dropDownContent--left"]}>
                    {exploreItem.map((item, key) => (
                        <div key={key} className={styles.dropDownItem}>
                            <div
                                className={styles.icon}
                                style={{
                                    backgroundImage: `url(${item.iconLink})`,
                                }}
                            ></div>
                            <p className={styles.title}>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.item}>
                <p>Stats</p>
                <div className={styles["dropDownContent--left"]}>
                    {statsItem.map((item, key) => (
                        <p key={key} className={styles.dropDownItem}>
                            {item.title}
                        </p>
                    ))}
                </div>
            </div>

            <div className={styles.item}>
                <p>Resources</p>
            </div>

            <div className={styles.item}>
                <p>Create</p>
            </div>

            <div className={styles.item}>
                <AccountCircleOutlinedIcon sx={iconButtonStyles} />
                <div className={styles["dropDownContent--right"]}>
                    {userItem.map((item, key) => (
                        <div key={key} className={styles.dropDownItem}>
                            <div className={styles.icon}>{item.iconLink}</div>
                            <p className={styles.title}>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.item}>
                <AccountBalanceWalletOutlinedIcon sx={iconButtonStyles} />
                {/* <div className={styles["dropDownContent--right"]}>
                    {walletItem.map((item, key) => (
                        <div key={key} className={styles.dropDownItem}>
                            <div
                                className={styles.icon}
                                style={{
                                    backgroundImage: `url(${item.iconLink})`,
                                }}
                            ></div>
                            <p className={styles.title}>{item.title}</p>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

const iconButtonStyles = {
    fontSize: 32,
    color: "rgba(4, 17, 29, 0.75)",
};
