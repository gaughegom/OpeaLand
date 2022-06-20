import React from "react";
import "./globalStyles.scss";

type GlobalStylesProps = {
    children: React.ReactNode;
};

const GlobalStyles = ({ children }: GlobalStylesProps) => {
    return <>{children}</>;
};

export default GlobalStyles;
