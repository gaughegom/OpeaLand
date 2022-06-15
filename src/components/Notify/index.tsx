import React from "react";

import styles from "./notifyStyles.module.scss";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useAppSelector, useAppDispatch } from "../../hooks";
import {removeNotify} from './notifySlice'

export type NotifyProps = {
    message: string;
    type: string;
    id: string;
};

export const NotifySuccess = ({ message }: {message: string}) => {
    return (
        <div className={styles.box}>
            <div className={styles.indicator__success}></div>
            <div className={styles.container}>{message}</div>
            <div className={styles.icon}>
                <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
            </div>
        </div>
    );
};

export const NotifyError = ({ message }: {message: string}) => {
    return (
        <div className={styles.box}>
            <div className={styles.indicator__error}></div>
            <div className={styles.container}>{message}</div>
            <div className={styles.icon}>
                <HighlightOffIcon sx={{ fontSize: 24 }} />
            </div>
        </div>
    );
};

export const NotifyStack = () => {
    const dispatch = useAppDispatch();

    const notifyStack = useAppSelector((state) => state.notify.notiStack);

    const handleClick = (item: NotifyProps) => {
        dispatch(removeNotify(item))
    };

    return (
        <div className={styles.stack}>
            {notifyStack &&
                notifyStack.map((item) => (
                    <div key={item.id} onClick = {() => handleClick(item)}>
                        {item.type === "success" ? (
                            <NotifySuccess
                                message={item.message!}
                            ></NotifySuccess>
                        ) : (
                            <NotifyError message={item.message!}></NotifyError>
                        )}
                    </div>
                ))}
        </div>
    );
};
