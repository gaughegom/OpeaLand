import React from "react";

import styles from "./cardCollectionStyles.module.scss";

import {sliceString} from '../../../../utils/strimString'

export type Props = {
    imgUrl: string;
    avtUrl: string;
    collectionName: string;
    author: string;
    description: string;
    id: string;
};

export default function CardItem(props: Props) {
    return (
        <div className={styles.box}>
            <div
                className={styles.img}
                style={{ backgroundImage: "url(" + props.imgUrl + ")" }}
            >
                <div
                    className={styles.avt}
                    style={{ backgroundImage: "url(" + props.avtUrl + ")" }}
                ></div>
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <p style={{ fontWeight: "bold"}}>{sliceString(props.collectionName,30)}</p>
                    <p style={{ fontWeight: 600, color: "rgb(112 122 131)"}}>
                        by <span style={{color: "var(--primaryColor)", fontWeight: "bold"}}>{sliceString(props.author, 30)}</span>
                    </p>
                </div>
                <div className={styles.description}>{sliceString(props.description, 100)}</div>
            </div>
        </div>
    );
}
