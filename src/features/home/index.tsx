import React from "react";

import Grid from "@mui/material/Grid";

import Banner from "./components/banner";

export default function Home() {
    const topCollection = {
        thumb: "https://openseauserdata.com/files/kith_friends_launch_image_rc1.jpeg",
        description: {
            avt: "https://openseauserdata.com/files/kith_friends_launch_creator_image_rc1.png",
            author: "fasdg",
            name: "Kithsd",
        },
    };

    return (
        <React.Fragment>
            <Grid container direction="column">
                <Banner
                    imgUrl={topCollection.thumb}
                    description={topCollection.description}
                ></Banner>
            </Grid>
        </React.Fragment>
    );
}
