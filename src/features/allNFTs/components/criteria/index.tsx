import React from "react";

import styles from "./criteriaStyles.module.scss";

import Chip from "@mui/material/Chip";

import { useAppSelector, useAppDispatch } from "../../../../hooks";
import { remove } from "../menuSide/menuCriteriaSlice";

export type CriteriaData = {
    title: string;
    value: string | number;
    criteria: string;
    key?: string | number;
    checked: boolean;
};
export const defaultCriteria = {
    title: "",
    value: "",
    criteria: "",
    key: "",
    checked: false,
};

export default function Criteria() {
    const dispatch = useAppDispatch();
    const criteriaData = useAppSelector(
        (state) => state.menuCriteria.criteriasList
    );

    const handleDelete = (criteriaToDelete: CriteriaData) => {
        dispatch(
            remove(
                criteriaData.find(
                    (item) => item.key === criteriaToDelete.key
                ) || defaultCriteria
            )
        );
    };

    return (
        <div className={styles.box}>
            {criteriaData.map(
                (item) =>
                    item.checked &&
                    (item.criteria === "status" ? (
                        <Chip
                            className={styles.chip}
                            label={item?.title}
                            key={item?.key}
                            onDelete={(e) => handleDelete(item)}
                        ></Chip>
                    ) : (
                        <Chip
                            className={styles.chip}
                            label={`${item.title} ${item.value} Eth`}
                            key={item?.key}
                            onDelete={(e) => handleDelete(item)}
                        ></Chip>
                    ))
            )}
        </div>
    );
}
