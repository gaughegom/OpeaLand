import React from "react";
import App from "./App";
import GlobalStyles from "./assets/styles";

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <GlobalStyles>
            <App></App>
        </GlobalStyles>
    </Provider>
);

