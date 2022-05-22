import * as React from "react";

import styles from "./headerStyles.module.scss";

import Logo from "./components/logo";
import Search from "./components/search";
import IconButton from "./components/iconButton";
import Navigate from "./components/navigate";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    return (
        <div className={styles.header}>
            <Logo></Logo>
            <Search></Search>
            <Navigate></Navigate>
            <IconButton>
                <AccountCircleOutlinedIcon sx={iconStyles} />
            </IconButton>
            <IconButton>
                <AccountBalanceWalletOutlinedIcon sx={iconStyles} />
            </IconButton>
            {/* <IconButton>
                <MenuIcon sx={iconStyles} />
            </IconButton> */}
        </div>
    );
}

const iconStyles = {
    fontSize: 32,
    color: "rgba(4, 17, 29, 0.75)",
};
