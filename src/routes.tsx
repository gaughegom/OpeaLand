import React from "react";

const AllNFTsPage = React.lazy(() => import("./features/allNFTs"));
const Collections = React.lazy(() => import("./features/collections"));
const Collection = React.lazy(() => import("./features/collection"));
const Item = React.lazy(() => import("./features/itemDetails"));
const Profile = React.lazy(() => import("./features/profile"))
const CreateNFT = React.lazy(() => import("./features/createNFT"))

export const ALL_NFTS_PATH = "/explore-all-nfts";
export const ALL_COLLECTIONS_PATH = "/explore-collections";
export const COLLECTION_PATH = "/collection";
export const HOME_PATH = "/home";
export const PROFILE_PATH = '/profile'
export const LOGIN_PATH = '/login'
export const ITEM_PATH = "/collection/:token/item/:tokenId"
export const CREATE_NFT_PATH = '/create'

type routeType = {
    path: string;
    element: JSX.Element;
};

const publicRoute: routeType[] = [
    {
        path: ALL_NFTS_PATH,
        element: <AllNFTsPage />,
    },
    {
        path: ALL_COLLECTIONS_PATH,
        element: <Collections />,
    },
    {
        path: COLLECTION_PATH + "/:id",
        element: <Collection />,
    },
    {
        path: ITEM_PATH,
        element: <Item />,
    },
];

const commonRoute: routeType[] = [];

const protectedRoute: routeType[] = [
    {
        path: PROFILE_PATH,
        element: <Profile />,
    },
    {
        path: CREATE_NFT_PATH,
        element: <CreateNFT />,
    },
];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
};

export default routes;
