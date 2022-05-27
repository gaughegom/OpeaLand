import React from "react";

const AllNFTsPage = React.lazy(() => import("./features/allNFTs"));

export const ALL_NFTS_PATH = '/explore-all-nfts';

type routeType = {
    path: string,
    element: JSX.Element
}

const publicRoute: routeType[] = [
    {
        path: ALL_NFTS_PATH,
        element: <AllNFTsPage />,
    },
];

const commonRoute: routeType[] = [];

const protectedRoute: routeType[] = [];

const managerRoute: routeType[] = [];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
