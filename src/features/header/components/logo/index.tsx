import React from 'react';

import styles from './logoStyles.module.scss'

export default function Logo() {
    return (
        <div className={styles.box}>
            <div className={styles.logo}></div>
            <p className={styles.name}>OpenLand</p>
        </div>
    )
}