import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './logoStyles.module.scss'

import {HOME_PATH} from '../../../../routes';

export default function Logo() {

    const navigate = useNavigate()

    return (
        <div className={styles.box} onClick={()=> navigate(HOME_PATH)}>
            <div className={styles.logo}></div>
            <p className={styles.name}>OpenLand</p>
        </div>
    )
}