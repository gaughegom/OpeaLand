import React from "react";

import styles from "./hotCollection.module.scss";

type Props = {
    imgUrl: string;
    description: {
        avt: string;
        author: string;
        name: string;
    };
};

export default function HotCollection({ imgUrl, description }: Props) {
    return (
        <div className={styles.box}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${imgUrl})` }}
            ></div>
            <div className={styles.description}>
                <div
                    className={styles.icon}
                    style={{ backgroundImage: `url(${description.avt})` }}
                ></div>
                <div className={styles.text}>
                    <p style={{ fontWeight: 600 }}>{description.name}</p>
                    <div>
                        <p style={{ display: "inline" }}>by </p>
                        <p style={{ display: "inline", fontWeight: 500 }}>
                            {description.author}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
