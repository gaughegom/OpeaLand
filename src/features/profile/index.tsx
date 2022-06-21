import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import styles from "./profileStyles.module.scss";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import CardItem from "../allNFTs/components/cardItem";

import { CREATE_COLLECTION_PATH } from "../../routes";
import Grid from "@mui/material/Grid";

import CardItemCollection from "../collections/components/cardCollection";

import { COLLECTION_PATH } from "../../routes";
import { sendData, validateEmail, validateUserName } from "./helper";

import { IItemModel } from "../../model/Item.model";
import formatAddress from "../../utils/formatAddress";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { pushNotify, removeNotify } from "../../components/Notify/notifySlice";
import { IWalletModel } from "../../model/Wallet.model";
import { ICollectionModel } from "../../model/Collection.model";

const DEFAULT_AVT =
    "https://storage.googleapis.com/opensea-static/opensea-profile/24.png";

const mockAPIWallet: IWalletModel = {
    address: "0xd35ksfd3gh34543",
    displayName: "ThangAka",
    description: "This is my Profile",
    imageUrl:
        "https://lh3.googleusercontent.com/GZ0mR0bDWG37xNN2aHU1Pbw7x6vP1ffOE3uIWRz0RgmUPuoNJ1x88XnMIzen8DzgniR1QRTkDBAy8IwLFKSf-V6cinr4I-Vqof_XbII=s168",
    bannerUrl:
        "https://lh3.googleusercontent.com/Xr3fiIUsW7MFizYceyVzwKMIkA62X5b00JpALnIQT839mOkbGEtfJRYEV1rLB_JHGzwsKlFRSAUZdCUm1KgQgQQmSdvWOv_eHkCc0A=h600",
    email: "pham1506thang@gmail.com",
};

const mockAPIsItem: IItemModel[] = [
    {
        token: "0xa041cd6a29b51ea150c1df09190d460e4a8f69fa",
        tokenId: "1",
        price: "12000000000000000000",
        // creator: "0x473555075d70a736788dcfcd7ca2901870cc575e",
        owner: "0x8995fcfa937a4bd874b47855d4f86d506ce9d3fc",
        ownerDisplay: "Joner",
        ipfsUrl: "https://6297612314e756fe3b2e98ee.mockapi.io/api/ipfs/1",
        status: 1,
        thumbLink: "http://loremflickr.com/640/480/abstract",
        collectionName: "Emerson",
        name: "Amos Daugherty",
        endAt: "2083-06-25T15:24:21.037Z",
    },
    {
        token: "0xa041cd6a29b51ea150c1df09190d460e4a8f69fa",
        tokenId: "2",
        price: "12000000000000000000",
        // creator: "0x473555075d70a736788dcfcd7ca2901870cc575e",
        owner: "0x8995fcfa937a4bd874b47855d4f86d506ce9d3fc",
        ownerDisplay: "Gausts",
        ipfsUrl: "https://6297612314e756fe3b2e98ee.mockapi.io/api/ipfs/1",
        status: 1,
        thumbLink: "http://loremflickr.com/640/480/abstract",
        collectionName: "Emerson",
        name: "Amos Daugherty",
        endAt: "2083-06-25T15:24:21.037Z",
    },
    {
        token: "0xa041cd6a29b51ea150c1df09190d460e4a8f69fa",
        tokenId: "3",
        price: "12000000000000000000",
        // creator: "0x473555075d70a736788dcfcd7ca2901870cc575e",
        owner: "0x8995fcfa937a4bd874b47855d4f86d506ce9d3fc",
        ownerDisplay: "Baed",
        ipfsUrl: "https://6297612314e756fe3b2e98ee.mockapi.io/api/ipfs/1",
        status: 1,
        thumbLink: "http://loremflickr.com/640/480/abstract",
        collectionName: "Emerson",
        name: "Amos Daugherty",
        endAt: "2083-06-25T15:24:21.037Z",
    },
];

const mockAPIsCollection: ICollectionModel[] = [
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

export default function Profile() {
    const me = useAppSelector((state) => state.wallet.walletInfo);
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
    const [items, setItem] = useState<IItemModel[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const newItems: IItemModel[] = await (
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

    const [userNameValue, setUserNameValue] = useState(me?.displayName || "");
    const [emailValue, setEmailValue] = useState(me?.email || "");
    const [descriptionValue, setDescriptionValue] = useState(
        me?.description || ""
    );

    const [userNameClass, setUserNameClass] = useState("");
    const [emailClass, setEmailClass] = useState("");

    const [saveClass, setSaveClass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateResult, setUpdateResult] = useState<any>(undefined);

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

        if (updateResult) {
            setIsLoading(false);
            setUpdateResult(undefined);
            const notify = {
                id: Date.now().toString(),
                type: updateResult.type,
                message: updateResult.message,
            };

            dispatch(pushNotify(notify));
            setTimeout(() => {
                dispatch(removeNotify(notify));
            }, 5000);
        }
    }, [userNameValue, updateResult]);
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

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescriptionValue(e.target.value);
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
    const handleSaveClick = async () => {
        const formData = new FormData();
        // owner display
        formData.append("displayName", userNameValue);
        formData.append("description", descriptionValue);
        formData.append("email", emailValue);
        if (selectedAvt) formData.append("fileAvt", selectedAvt);
        if (selectedBanner) formData.append("fileBanner", selectedBanner);

        setSaveClass("_disable");
        setIsLoading(true);
        setUpdateResult(await sendData(formData));
    };
    //----------------
    const dispatch = useAppDispatch();

    return (
        <div>
            {/* banner */}
            <div className={styles.banner}>
                <div
                    className={styles.bannerChild}
                    style={{ backgroundImage: `url(${me?.bannerUrl})` }}
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
                    style={{
                        backgroundImage: `url(${me?.imageUrl || DEFAULT_AVT})`,
                    }}
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
                    <div className={styles.name}>
                        {me?.displayName || "Unamed"}
                    </div>
                    <div
                        className={styles.address}
                        onClick={() => {
                            navigator.clipboard.writeText(me?.address!);
                            const notify = {
                                id: Date.now().toString(),
                                type: "success",
                                message: "Copied.",
                            };
                            dispatch(pushNotify(notify));
                        }}
                    >
                        <div>{formatAddress(me?.address!)}</div>
                        <ContentCopyIcon
                            sx={{ fontSize: 20 }}
                        ></ContentCopyIcon>
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
                                {mockAPIsItem !== [] ? (
                                    <Grid item>
                                        <Grid
                                            container
                                            rowSpacing={2}
                                            columnSpacing={2}
                                            className={styles.boxItem}
                                        >
                                            {mockAPIsItem.map((item, idx) => (
                                                <Grid item md={3} key={idx}>
                                                    <CardItem
                                                        thumbLink={
                                                            item.thumbLink
                                                        }
                                                        token={item.token}
                                                        tokenId={item.tokenId}
                                                        name={item.name}
                                                        collectionName={
                                                            item.collectionName
                                                        }
                                                        price={item.price}
                                                        owner={item.owner}
                                                        ownerDisplay={
                                                            item.ownerDisplay
                                                        }
                                                        ipfsUrl={item.ipfsUrl}
                                                        status={item.status}
                                                        endAt={item.endAt}
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
                            <div className={styles.container}>
                                <div
                                    onClick={() =>
                                        navigate(CREATE_COLLECTION_PATH)
                                    }
                                    className={styles.createBtn}
                                >
                                    Create a collection
                                </div>
                                {mockAPIsCollection !== [] ? (
                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={2}
                                    >
                                        {mockAPIsCollection.map(
                                            (item, index) => (
                                                <Grid
                                                    item
                                                    md={4}
                                                    key={index}
                                                    onClick={() =>
                                                        navigate(
                                                            `${COLLECTION_PATH}/${item.token}`
                                                        )
                                                    }
                                                >
                                                    <CardItemCollection
                                                        {...item}
                                                    ></CardItemCollection>
                                                </Grid>
                                            )
                                        )}
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
                                                htmlFor="description"
                                                className={styles.label}
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="Tell the world your story"
                                                id="description"
                                                className={styles.input}
                                                value={descriptionValue}
                                                onChange={
                                                    handleDescriptionChange
                                                }
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
                                                            : me?.imageUrl ||
                                                              DEFAULT_AVT
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
                                                            : me?.bannerUrl
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
