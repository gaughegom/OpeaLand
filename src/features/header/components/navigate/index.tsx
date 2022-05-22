import * as React from "react";

import styles from "./navigateStyles.module.scss";

export default function Navigate() {
    const exploreItem = ["All NFTs", "Collectibles"];

    return (
        <div className={styles.navigate}>
            <div className={styles.item}>
                <p>Explore</p>
                <div className={styles.dropDownContent}>
                    {exploreItem.map((item, key) => (
                        <p key={key} className={styles.dropDownItem}>{item}</p>
                    ))}
                </div>
            </div>
            <div className={styles.item}>
                <p>Stats</p>
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
