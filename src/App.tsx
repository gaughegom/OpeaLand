import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";

import Header from './features/header'
import Footer from './features/footer'

const theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "cursive"].join(","),
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
