import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./searchResult.module.scss";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

type Props = {
    result?: {
        items: {
            collection: string;
            thumbLink: string;
            name: string;
            path: string;
        }[];
        collections: any;
        accounts: any;
    };
    top?: number;
    left?: number;
    display?: string;
};

export default function SearchResult(defaultProp: Props) {
    const navigate = useNavigate();

    const { result, ...rest } = defaultProp;
    const inlineStyle = rest;

    const itemsLenght = result?.items.length;

    const noResult = <div className={styles["no-result"]}>No result</div>;

    return (
        <div className={styles.box} style={inlineStyle}>
            <Grid container direction="column" className={styles.grid}>
                <div className={styles.group}>Items</div>
                {itemsLenght === 0
                    ? noResult
                    : result?.items.map((item, idx) => (
                          <div
                              className={styles.item}
                              key={idx}
                              onClick={() => navigate(item.path)}
                          >
                              <div
                                  className={styles.logo}
                                  style={{
                                      backgroundImage: `url(${item.thumbLink})`,
                                  }}
                              ></div>

                              <div className={styles.description}>
                                  <p style={{ fontWeight: 600 }}>{item.name}</p>
                                  <p style={{ fontSize: 12 }}>
                                      {item.collection}
                                  </p>
                              </div>
                          </div>
                      ))}
                <Divider />

                <div className={styles.group}>Collections</div>
                {itemsLenght === 0
                    ? noResult
                    : result?.items.map((item, idx) => (
                          <div
                              className={styles.item}
                              key={idx}
                              onClick={() => navigate(item.path)}
                          >
                              <div
                                  className={styles.logo}
                                  style={{
                                      backgroundImage: `url(${item.thumbLink})`,
                                  }}
                              ></div>

                              <div className={styles.description}>
                                  <p style={{ fontWeight: 600 }}>{item.name}</p>
                                  <p style={{ fontSize: 12 }}>
                                      {item.collection}
                                  </p>
                              </div>
                          </div>
                      ))}
                <Divider />
                <div className={styles.group}>Accounts</div>
            </Grid>
        </div>
    );
}
