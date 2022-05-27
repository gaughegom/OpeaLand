import * as React from "react";
import { useState } from "react";

import styles from "./searchStyles.module.scss";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SearchResult from "./components/searchResult";

export default function Search() {
    const [inlineStyle, setInlineStyle] = useState({
        top: 60,
        left: 0,
        display: "none",
    });

    const result = {
        items: [
            {
                collection: "my collection",
                thumbLink:
                    "https://lh3.googleusercontent.com/cVS0B_4STQykg4-h0ODGUkBGhoryxyLIQzzO7Jj2fSHHyPOJ8-UvYbISh5vAPwd3hK-CJEyooB8MfDFvphnWv4gW9sCHNd3yR5MuBw=s64",
                name: "iem nam",
                path: "",
            },
        ],
        collections: [],
        accounts: [],
    };

    // handle event 
    const handleOpenSearchResult = () => {
        const {display, ...rest} = inlineStyle
        const newStyle = {...rest, display: 'block'}
        setInlineStyle(newStyle)
    }

    const handleCloseSearchResult = () => {
        const {display, ...rest} = inlineStyle
        const newStyle = {...rest, display: 'none'}
        setInlineStyle(newStyle)
    }

    return (
        <div className={styles.box}>
            <SearchIcon sx={{ fontSize: 24, color: "#767F88" }} />
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 16, color: "#737D85" }}
                placeholder="Search Item, Collections"
                onClick= {handleOpenSearchResult}
                onBlur = {handleCloseSearchResult}
            />
            <SearchResult
                result={result}
                top={inlineStyle.top}
                left={inlineStyle.left}
                display={inlineStyle.display}
            ></SearchResult>
        </div>
    );
}
