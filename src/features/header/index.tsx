import * as React from "react";

import styles from "./headerStyles.module.scss";

import Logo from "./components/logo";
import Search from "./components/search";
import Navigate from "./components/navigate";

export default function Header() {
    return (
        <div className={styles.header}>
            <Logo></Logo>
            <Search></Search>
            <Navigate></Navigate>
        </div>
    );
}
