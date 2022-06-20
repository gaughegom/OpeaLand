import React from "react";
import styles from "./iconButton.module.scss";

type Props = {
    children: React.ReactNode;
};

const GlobalStyles = ({ children }: Props) => {
    return <div className={styles.box}>{children}</div>;
};

export default GlobalStyles;
