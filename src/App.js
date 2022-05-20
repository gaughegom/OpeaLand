import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "cursive"].join(","),
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
