import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import moment from "moment";

import styles from "./profileStyles.module.scss";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import CardItem from "../allNFTs/components/cardItem";

import { ALL_ITEMS } from "../../services/APIurls";
import { itemType } from "../allNFTs";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import CardItemCollection from "../collections/components/cardCollection";

import { Props } from "../collections/components/cardCollection";
import { COLLECTION_PATH } from "../../routes";
import { validateEmail, validateUserName } from "./helper";

const mockAPI: Props[] = [
    {
        imgUrl: "https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "The Doggies (Snoop Dogg)",
        author: "TheSandboxGame",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        id: "gad",
    },
    {
        imgUrl: "https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "The Doggies (Snoop Dogg)",
        author: "TheSandboxGame",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        id: "gad",
    },
    {
        imgUrl: "https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "The Doggies (Snoop Dogg)",
        author: "TheSandboxGame",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        id: "gad",
    },
    {
        imgUrl: "https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200",
        avtUrl: "https://lh3.googleusercontent.com/ufumJQN9NwT0U5jh_suJP5cLRIjyE38hirVdBChQLe-ghnt1RomIARfxSNmR6fdMQC0OIgjVQHhhduUfcxiRVrfHpihrXSW-SU5J=s100",
        collectionName: "The Doggies (Snoop Dogg)",
        author: "TheSandboxGame",
        description:
            "10,000 metaverse-ready Avatars, playable in The Sandbox. Each Doggy has been generated from over 150+ traits, curated by Snoop Dogg himself. Owning a Doggy provides access to a playable The Sandbox avatar, as well as access to future features inside the metaverse.",
        id: "gad",
    },
];

const user = {
    name: "John",
    address: "0xEE2552070EC5C7D73745D63BB2f50d9089593b65",
    joined: "4-20-2022",
    cover: "https://lh3.googleusercontent.com/Xr3fiIUsW7MFizYceyVzwKMIkA62X5b00JpALnIQT839mOkbGEtfJRYEV1rLB_JHGzwsKlFRSAUZdCUm1KgQgQQmSdvWOv_eHkCc0A=h600",
    avt: "https://lh3.googleusercontent.com/GZ0mR0bDWG37xNN2aHU1Pbw7x6vP1ffOE3uIWRz0RgmUPuoNJ1x88XnMIzen8DzgniR1QRTkDBAy8IwLFKSf-V6cinr4I-Vqof_XbII=s168",
    created: [],
    collected: [],
};

export default function Profile() {
    // indicator
    const [indicators, setIndicators] = useState([
        { title: "Collected", value: 1, isActive: true },
        { title: "Collections", value: 2, isActive: false },
        { title: "Profile setting", value: 3, isActive: false },
    ]);
    const [currentIndicator, setCurrentIndicator] = useState(1);

    const handleActive = (index: number) => {
        const newIndicators = indicators.map((item) => {
            if (item.value === index) {
                return { ...item, isActive: true };
            }
            return { ...item, isActive: false };
        });
        setIndicators(newIndicators);
        setCurrentIndicator(index);
    };
    //------------------------
    //container
    const noItem = (
        <div className={styles.noItem}>
            <div>No item to display</div>
        </div>
    );
    const [items, setItem] = useState<itemType[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const newItems: itemType[] = await (
    //             await axios.get(ALL_ITEMS)
    //         ).data;
    //         setItem(newItems);
    //     };

    //     fetchData();
    // }, []);
    const navigate = useNavigate();
    //------
    //valid form
    const [isValidUserName, setIsValidUserName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [userNameValue, setUserNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

    const [userNameClass, setUserNameClass] = useState("");
    const [emailClass, setEmailClass] = useState("");

    const [saveClass, setSaveClass] = useState("");

    useEffect(() => {
        if (validateUserName(userNameValue)) {
            setIsValidUserName(true);
            setUserNameClass("");
            if (isValidEmail) {
                setSaveClass("");
            }
        } else {
            setIsValidUserName(false);
            setUserNameClass("_invalid");
            setSaveClass("_disable");
        }
    }, [userNameValue]);
    useEffect(() => {
        if (validateEmail(emailValue)) {
            setIsValidEmail(true);
            setEmailClass("");
            if (isValidUserName) {
                setSaveClass("");
            }
        } else {
            setIsValidEmail(false);
            setEmailClass("_invalid");
            setSaveClass("_disable");
        }
    }, [emailValue]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserNameValue(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    //------------
    //upload img
    const [selectedAvt, setSelectedAvt] = useState<any>();

    const changeAvtHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedAvt(event.target.files[0]);
        }
    };

    const [selectedBanner, setSelectedBanner] = useState<any>();

    const changeBannerHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedBanner(event.target.files[0]);
        }
    };

    const removeAvtHandler = () => {
        setSelectedAvt(undefined);
    };
    const removeBannerHandler = () => {
        setSelectedBanner(undefined);
    };
    //------
    //save
    const [openNoti, setOpenNoti] = useState(false);
    const handleSaveClick = () => {
        alert("Save");
        setOpenNoti(true);
        setTimeout(() => {
            setOpenNoti(false);
        }, 5000)
    };
    //----------------
    return (
        <div>
            {/* banner */}
            <div className={styles.banner}>
                <div
                    className={styles.bannerChild}
                    style={{ backgroundImage: `url(${user.cover})` }}
                >
                    {/* <div className={styles.layout}></div>
                    <div className={styles.editIcon}>
                        <ModeEditIcon
                            sx={{ fontSize: 32, color: "white" }}
                        ></ModeEditIcon>
                    </div> */}
                </div>
                <div
                    className={styles.avt}
                    style={{ backgroundImage: `url(${user.avt})` }}
                >
                    {/* <div className={styles.layout}></div>
                    <div className={styles.editIcon}>
                        <ModeEditIcon
                            sx={{ fontSize: 32, color: "white" }}
                        ></ModeEditIcon>
                    </div> */}
                </div>
            </div>
            {/* grid */}
            <div className={styles.grid}>
                {/* header */}
                <div className={styles.info}>
                    <div className={styles.name}>{user.name}</div>
                    <div
                        className={styles.address}
                        onClick={() =>
                            navigator.clipboard.writeText(user.address)
                        }
                    >
                        <div>{user.address}</div>
                        <ContentCopyIcon
                            sx={{ fontSize: 20 }}
                        ></ContentCopyIcon>
                    </div>

                    <div className={styles.joined}>
                        Joined {formatTime(user.joined).toString()}
                    </div>
                </div>
                {/* tabpanel */}
                <div className={styles.tabs}>
                    <div className={styles.indicators}>
                        {indicators.map((item, idx) => {
                            return (
                                <div
                                    onClick={(e) => handleActive(item.value)}
                                    className={
                                        styles[
                                            `indicator${
                                                item.isActive ? "_active" : ""
                                            }`
                                        ]
                                    }
                                    key={idx}
                                >
                                    <div>{item.title}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.container}>
                        {currentIndicator === 1 && (
                            <div>
                                {user.collected !== [] ? (
                                    <Grid item>
                                        <Grid
                                            container
                                            rowSpacing={2}
                                            columnSpacing={2}
                                            className={styles.boxItem}
                                        >
                                            {items.map((item) => (
                                                <Grid item md={3} key={item.id}>
                                                    <CardItem
                                                        thumbLink={
                                                            item.thumbLink
                                                        }
                                                        id={item.id}
                                                        name={item.name}
                                                        collection={
                                                            item.collection
                                                        }
                                                        isFavorite={
                                                            item.isFavorite
                                                        }
                                                        price={item.price}
                                                    ></CardItem>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                ) : (
                                    noItem
                                )}
                            </div>
                        )}

                        {currentIndicator === 2 && (
                            <div>
                                {mockAPI !== [] ? (
                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={2}
                                    >
                                        {mockAPI.map((item, index) => (
                                            <Grid item md={4} key={index}>
                                                <CardItemCollection
                                                    {...item}
                                                    onClick={() =>
                                                        navigate(
                                                            `${COLLECTION_PATH}/${item.id}`
                                                        )
                                                    }
                                                ></CardItemCollection>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    noItem
                                )}
                            </div>
                        )}

                        {currentIndicator === 3 && (
                            <div className={styles.profileSetting}>
                                <div className={styles.left}>
                                    <div className={styles.form}>
                                        <div className={styles.field}>
                                            <label
                                                htmlFor="username"
                                                className={styles.label}
                                            >
                                                Username
                                            </label>
                                            <input
                                                placeholder="Enter username"
                                                type="text"
                                                id="username"
                                                className={
                                                    styles[
                                                        `input${userNameClass}`
                                                    ]
                                                }
                                                value={userNameValue}
                                                onChange={handleUsernameChange}
                                            ></input>
                                            {!isValidUserName && (
                                                <div
                                                    className={
                                                        styles.helperText
                                                    }
                                                >
                                                    Invalid username. Can only
                                                    contain letters, numbers,
                                                    hyphens (-), and underscores
                                                    (_).
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.field}>
                                            <label
                                                htmlFor="bio"
                                                className={styles.label}
                                            >
                                                Bio
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="Tell the world your story"
                                                id="bio"
                                                className={styles.input}
                                            ></textarea>
                                        </div>

                                        <div className={styles.field}>
                                            <label
                                                htmlFor="email"
                                                className={styles.label}
                                            >
                                                Email
                                            </label>
                                            <input
                                                placeholder="yourname@yourhost.com"
                                                type="email"
                                                id="email"
                                                className={
                                                    styles[`input${emailClass}`]
                                                }
                                                value={emailValue}
                                                onChange={handleEmailChange}
                                            ></input>
                                            {!isValidEmail && (
                                                <div
                                                    className={
                                                        styles.helperText
                                                    }
                                                >
                                                    Invalid email.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={styles[`save${saveClass}`]}
                                        onClick={
                                            saveClass === "_disable"
                                                ? undefined
                                                : handleSaveClick
                                        }
                                    >
                                        Save
                                    </div>
                                </div>
                                {/* right */}
                                <div className={styles.right}>
                                    <div className={styles.form}>
                                        <div className={styles.field}>
                                            <div className={styles.label}>
                                                Profile Image
                                            </div>
                                            <div
                                                className={styles.avt}
                                                style={{
                                                    backgroundImage: `url(${
                                                        selectedAvt !==
                                                        undefined
                                                            ? URL.createObjectURL(
                                                                  selectedAvt
                                                              )
                                                            : user.avt
                                                    })`,
                                                }}
                                            >
                                                <div
                                                    className={styles.layout}
                                                ></div>
                                                <div
                                                    className={styles.editIcon}
                                                >
                                                    <ModeEditIcon
                                                        sx={{
                                                            fontSize: 32,
                                                            color: "white",
                                                        }}
                                                    ></ModeEditIcon>
                                                </div>
                                                <input
                                                    className={styles.loadFile}
                                                    type="file"
                                                    accept="image/*"
                                                    id="avt"
                                                    onChange={changeAvtHandler}
                                                ></input>
                                            </div>
                                            <div
                                                className={styles.remove}
                                                onClick={removeAvtHandler}
                                            >
                                                Remove Image
                                            </div>
                                        </div>

                                        <div className={styles.field}>
                                            <div className={styles.label}>
                                                Profile Banner
                                            </div>
                                            <div
                                                className={styles.banner}
                                                style={{
                                                    backgroundImage: `url(${
                                                        selectedBanner !==
                                                        undefined
                                                            ? URL.createObjectURL(
                                                                  selectedBanner
                                                              )
                                                            : user.cover
                                                    })`,
                                                }}
                                            >
                                                <div
                                                    className={styles.layout}
                                                ></div>
                                                <div
                                                    className={styles.editIcon}
                                                >
                                                    <ModeEditIcon
                                                        sx={{
                                                            fontSize: 32,
                                                            color: "white",
                                                        }}
                                                    ></ModeEditIcon>
                                                </div>
                                                <input
                                                    className={styles.loadFile}
                                                    type="file"
                                                    accept="image/*"
                                                    id="banner"
                                                    onChange={
                                                        changeBannerHandler
                                                    }
                                                ></input>
                                            </div>
                                            <div
                                                className={styles.remove}
                                                onClick={removeBannerHandler}
                                            >
                                                Remove Image
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {openNoti && (
                                    <div className={styles.notification}>
                                        <div className={styles.icon}>
                                            <CheckCircleIcon
                                                sx={{
                                                    fontSize: 24,
                                                    color: "green",
                                                }}
                                            ></CheckCircleIcon>
                                        </div>
                                        <div>Save successfully</div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* --- */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const formatTime = (timeString: string) => {
    return moment(timeString).format("MMMM Do YYYY");
};
