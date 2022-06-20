import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./collectionsStyles.module.scss";

import Grid from "@mui/material/Grid";

import Banner from "./components/banner";
import CardItem from "./components/cardCollection";

import { COLLECTION_PATH } from "../../routes";
import { ICollectionModel } from "../../model/Collection.model";
import { http } from "../../services/AxiosHelper";
import { GET_ALL_COLLECTIONS } from "../../services/APIurls";

const mockAPIs: ICollectionModel[] = [
    {
        bannerUrl:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
        logoUrl:
            "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        name: "The Doggies (Snoop Dogg)",
        creatorDisplayName: "Gaust",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        token: "065xad34534dssfsdf4we4fdgrewdf",
        creator: "0x3453953dsdfe34sf",
        amount: 1453,
    },
    {
        bannerUrl:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
        logoUrl:
            "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        name: "The Doggies (Snoop Dogg)",
        creatorDisplayName: "Gaust",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        token: "065xad34534dssfsdf4we4fdgrewdf",
        creator: "0x3453953dsdfe34sf",
        amount: 1453,
    },
    {
        bannerUrl:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
        logoUrl:
            "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        name: "The Doggies (Snoop Dogg)",
        creatorDisplayName: "Gaust",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        token: "065xad34534dssfsdf4we4fdgrewdf",
        creator: "0x3453953dsdfe34sf",
        amount: 1453,
    },
    {
        bannerUrl:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
        logoUrl:
            "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        name: "The Doggies (Snoop Dogg)",
        creatorDisplayName: "Gaust",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        token: "065xad34534dssfsdf4we4fdgrewdf",
        creator: "0x3453953dsdfe34sf",
        amount: 1453,
    },
];

export default function () {
    const navigate = useNavigate();

    var allCollections = [];

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await http.get<any>(GET_ALL_COLLECTIONS + "/all");
            allCollections = result.data;
        };

        fetchData();
    });

    return (
        <div>
            <Banner></Banner>
            <p className={styles.headTitle}>Explore Collectibles</p>
            <Grid container spacing={4} className={styles.grid}>
                {mockAPIs &&
                    mockAPIs.map((item, index) => (
                        <Grid
                            item
                            md={4}
                            key={index}
                            onClick={() =>
                                navigate(`${COLLECTION_PATH}/${item.token}`)
                            }
                        >
                            <CardItem {...item}></CardItem>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
