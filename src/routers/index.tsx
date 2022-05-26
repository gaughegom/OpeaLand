import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";

import Header from "../features/header";
import Footer from "../features/footer";

import React from "react";

// import page
const HomePage = React.lazy(() => import("../features/home"));

// waiting
const loading = (
    <div>
        <h1>Loading...</h1>
    </div>
);

const headerMargin = 72;

const Routers = () => {
    return (
        <React.Suspense fallback={loading}>
            <Header></Header>
            <div style={{marginTop: headerMargin}}></div>
            <Routes>
                <Route path="home" element={<HomePage />} />
                <Route index element={<Navigate to="home" />} />
                {/* {routes.publicRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })} */}
            </Routes>
            <Footer></Footer>
        </React.Suspense>
    );
};

export default Routers;
