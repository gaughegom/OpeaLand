import React from "react";

import styles from "./cardCollectionStyles.module.scss";

import {sliceString} from '../../../../utils/strimString'

import {ICollectionModel} from '../../../../model/Collection.model'


export default function CardItem(props: ICollectionModel) {
    return (
        <div className={styles.box}>
            <div
                className={styles.img}
                style={{ backgroundImage: "url(" + props.bannerUrl + ")" }}
            >
                <div
                    className={styles.avt}
                    style={{ backgroundImage: "url(" + props.logoUrl + ")" }}
                ></div>
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <p style={{ fontWeight: "bold"}}>{sliceString(props.name,30)}</p>
                    <p style={{ fontWeight: 600, color: "rgb(112 122 131)"}}>
                        by <span style={{color: "var(--primaryColor)", fontWeight: "bold"}}>{sliceString(props.creatorDisplayName, 30)}</span>
                    </p>
                </div>
                <div className={styles.description}>{sliceString(props.description, 100)}</div>
            </div>
        </div>
    );
}
