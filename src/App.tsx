import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";

import Header from './features/header'

const theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "cursive"].join(","),
    },
});

const headerMargin = 72;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header></Header>
            <div style={{marginTop: headerMargin}}></div>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
