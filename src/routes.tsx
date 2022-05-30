import React from "react";

const AllNFTsPage = React.lazy(() => import("./features/allNFTs"));
const Collections = React.lazy(() => import("./features/collections"))

export const ALL_NFTS_PATH = '/explore-all-nfts';
export const COLLECTIONS_PATH = '/explore-collections';

type routeType = {
    path: string,
    element: JSX.Element
}

const publicRoute: routeType[] = [
    {
        path: ALL_NFTS_PATH,
        element: <AllNFTsPage />,
    },
    {
        path: COLLECTIONS_PATH,
        element: <Collections />,
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
