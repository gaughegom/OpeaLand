import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./collectionsStyles.module.scss";

import Grid from "@mui/material/Grid";

import Banner from "./components/banner";
import CardItem from "./components/cardCollection";

import { Props } from "../collections/components/cardCollection";
import { COLLECTION_PATH } from "../../routes";

const mockAPIs: Props[] = [
    {
        imgUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "The Doggies (Snoop Dogg)",
        author: "Gaust",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        id: "065xad34534dssfsdf4we4fdgrewdf",
    },
    {
        imgUrl: "https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "Ergonomic ",
        author: "My Heart",
        description:
            "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
        id: "07x45adfaed4545dfrt4sdfsfd4adsf",
    },
    {
        imgUrl: "https://images.unsplash.com/photo-1655013090015-4ee419d8db1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "The Doggies (Snoop Dogg)",
        author: "TheSandboxGame",
        description:
            "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        id: "06x3454dferawdfvere44354df34rdf4",
    },
];

export default function () {
    const navigate = useNavigate();

    return (
        <div>
            <Banner></Banner>
            <p className={styles.headTitle}>Explore Collectibles</p>
            <Grid container spacing={4} className={styles.grid}>
                {mockAPIs &&
                    mockAPIs.map((item, index) => (
                        <Grid item md={4} key={index}>
                            <CardItem
                                {...item}
                                onClick={() =>
                                    navigate(`${COLLECTION_PATH}/${item.id}`)
                                }
                            ></CardItem>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
