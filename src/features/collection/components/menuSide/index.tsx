import React from "react";
import { useState, useEffect } from "react";

import styles from "./menuSideStyles.module.scss";

import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAppSelector, useAppDispatch } from "../../../../hooks";
import { add, remove, changePrice } from "./menuCriteriaSlice";
import { defaultCriteria } from "../criteria";

export default function MenuSide() {
    const dispatch = useAppDispatch();

    const criteriaStatus = useAppSelector(
        (state) => state.menuCollectionCriteria.criteriasList
    );

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target =
            criteriaStatus.find((item) => item?.key === e.target.value) ||
            defaultCriteria;

        if (e.target.checked) {
            dispatch(add(target || defaultCriteria));
        } else {
            dispatch(remove(target || defaultCriteria));
        }
    };

    //price
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [helperText, setHelperText] = useState("");
    const [disableApplyClassButton, setDisableApplyClassButton] = useState("");

    useEffect(() => {
        if (minValue !== "" && maxValue !== "") {
            if (minValue >= maxValue) {
                setHelperText("Min must be less than Max");
                setDisableApplyClassButton("_disable");
            } else {
                setHelperText("");
                setDisableApplyClassButton("");
            }
        } else if (minValue === "" && maxValue === "") {
            setDisableApplyClassButton("_disable");
        } else {
            setHelperText("");
            setDisableApplyClassButton("");
        }
    }, [minValue, maxValue]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "Min") {
            setMinValue(e.target.value);
        } else {
            setMaxValue(e.target.value);
        }
    };
    //---
    //handle apply
    const handleApplyButton = () => {
        if(disableApplyClassButton === "") {
            if (minValue !== "") {
                dispatch(changePrice({
                    title: "Min",
                    value: Number(minValue),
                    criteria: "price",
                    key: "Min",
                    checked: true,
                }))
            }
            if (maxValue !== "") {
                dispatch(changePrice({
                    title: "Max",
                    value: Number(maxValue),
                    criteria: "price",
                    key: "Max",
                    checked: true,
                }))
            }
        }
        console.log(criteriaStatus)
    };
    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                sx={{ fontSize: 24, color: "black" }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <p className={styles.title}>Status</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.details}>
                            {criteriaStatus
                                .filter((item) => item.criteria === "status")
                                .map((criteria) => {
                                    return (
                                        <div
                                            className={styles.item}
                                            key={criteria?.value}
                                        >
                                            <label
                                                htmlFor={criteria?.value.toString()}
                                                style={{ width: "100%" }}
                                            >
                                                {criteria?.title}
                                            </label>
                                            <input
                                                type="checkbox"
                                                id={criteria?.value.toString()}
                                                name={criteria?.value.toString()}
                                                value={criteria?.value}
                                                onChange={handleStatusChange}
                                                checked={criteria?.checked}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                {/* price */}
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                sx={{ fontSize: 24, color: "black" }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <p className={styles.title}>Price</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.details}>
                            {criteriaStatus
                                .filter((item) => item.criteria === "price")
                                .map((criteria) => {
                                    return (
                                        <div
                                            className={styles.item_price}
                                            key={criteria?.key}
                                        >
                                            <label
                                                htmlFor={criteria?.key?.toString()}
                                                style={{ flex: 1 }}
                                            >
                                                {criteria?.title}
                                            </label>
                                            <div
                                                className={styles.right}
                                                style={{ width: "80%" }}
                                            >
                                                <input
                                                    style={{ width: "100%" }}
                                                    type="number"
                                                    min={0}
                                                    id={criteria?.key?.toString()}
                                                    name={criteria?.key?.toString()}
                                                    value={
                                                        criteria?.key === "Min"
                                                            ? minValue
                                                            : maxValue
                                                    }
                                                    onChange={handlePriceChange}
                                                />
                                                <p>Eth</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            {helperText !== "" && (
                                <p className={styles.helper}>{helperText}</p>
                            )}
                            <div
                                className={
                                    styles[`apply${disableApplyClassButton}`]
                                }
                                onClick={handleApplyButton}
                            >
                                Apply
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Divider orientation="vertical" flexItem></Divider>
        </div>
    );
}
