import React from "react";
import { useState } from "react";

import styles from "./filterStyle.module.scss";

import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import FilterDropdown from "../filterDropdown";
import MenuSide from "../menuSide";

import { useAppSelector, useAppDispatch } from "../../../../hooks";
import { openHandle, closeHandle } from "../../allNFTsSlice";

export default function Filter() {
    const filterIconSize = 24;

    // side menu
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.allNFTs.open);

    const toggle = () => {
        if (open) {
            dispatch(closeHandle());
        } else {
            dispatch(openHandle());
        }
    };
    //------------------------
    // soft by
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };
    //------------------------

    return (
        <div className={styles.box}>
            <div className={styles.icon} onClick={toggle}>
                <FilterListIcon sx={{ fontSize: filterIconSize }} />
            </div>
            <div className={styles.filter}>
                <div className={styles.holder} onClick={handleDropdown}>
                    <p>Sort by</p>
                    <KeyboardArrowDownIcon sx={{ fontSize: filterIconSize }} />
                </div>
                {openDropdown && (
                    <FilterDropdown
                        onClose={handleDropdown}
                        open={openDropdown}
                    ></FilterDropdown>
                )}
            </div>
            {open && <MenuSide></MenuSide>}
        </div>
    );
}
