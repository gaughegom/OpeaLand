import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";

import Header from "../features/header/";
import Footer from "../features/footer";
import { NotifyStack } from "../components/Notify";

import { HOME_PATH } from "../routes";

import React from "react";

// import page
const HomePage = React.lazy(() => import("../features/home"));

// waiting
const loading = (
    <div>
        <h1>Loading...</h1>
    </div>
);

const Routers = () => {
    return (
        <React.Suspense fallback={loading}>
            <Header></Header>
            <Routes>
                <Route path={HOME_PATH} element={<HomePage />} />
                <Route index element={<Navigate to={HOME_PATH} />} />
                {routes.publicRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
                {routes.protectedRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
            </Routes>
            <Footer></Footer>
            <NotifyStack></NotifyStack>
        </React.Suspense>
    );
};

export default Routers;
