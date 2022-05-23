import * as React from "react";

import styles from "./navigateStyles.module.scss";

export default function Navigate() {
    const exploreItem = [
        {
            iconLink:
                "https://opensea.io/static/images/icons/allnfts-light.svg",
            title: "All NFTs",
        },
        {
            iconLink:
                "https://opensea.io/static/images/icons/collectibles-light.svg",
            title: "Collectibles",
        },
    ];
    const statsItem = ["Rankings", "Activity"];

    return (
        <div className={styles.navigate}>
            <div className={styles.item}>
                <p>Explore</p>
                <div className={styles.dropDownContent}>
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
                <div className={styles.dropDownContent}>
                    {statsItem.map((item, key) => (
                        <p key={key} className={styles.dropDownItem}>
                            {item}
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
        </div>
    );
}
