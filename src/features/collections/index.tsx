import React from "react";

import styles from "./collectionsStyles.module.scss";

import Grid from "@mui/material/Grid";

import Banner from "./components/banner";
import CardItem from "./components/cardCollection";

import {Props} from '../collections/components/cardCollection'

const mockAPI: Props = {
    imgUrl: "https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200",
    avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
    collectionName: "The Doggies (Snoop Dogg)",
    author: "TheSandboxGame",
    description: "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
    id: "gad"
}

export default function () {
    return (
        <div>
            <Banner></Banner>
            <p className={styles.headTitle}>Explore Collectibles</p>
            <Grid container spacing={4} className = {styles.grid}>
                {Array.from(Array(20)).map((_, index) => (
                    <Grid item md={4} key={index}>
                        <CardItem {...mockAPI}></CardItem>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
