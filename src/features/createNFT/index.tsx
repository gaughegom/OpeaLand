import React from "react";

import styles from "./createNFTStyles.module.scss";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ListIcon from "@mui/icons-material/List";
import Divider from "@mui/material/Divider";

import AddModal from "./addModal";

import { sendData } from "./helper";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { pushNotify, removeNotify } from "../../components/Notify/notifySlice";

import { sliceString } from "../../utils/strimString";

function RequestSymbol() {
    return <span className={styles.require}>*</span>;
}

export default function CreateNFT() {
    const dispatch = useAppDispatch();

    const [saveClass, setSaveClass] = React.useState("save_disable");
    const [createResult, setCreateResult] = React.useState<any>(undefined);

    const [selectedAvt, setSelectedAvt] = React.useState<any>(undefined);
    const [nameInput, setNameInput] = React.useState<string>("");
    const [descriptionInput, setDescriptionInput] = React.useState<string>("");
    const [externalLinkInput, setExternalLinkInput] =
        React.useState<string>("");
    const [properties, setProperties] = React.useState<
        { type: string; name: string; id: string }[]
    >([]);

    React.useEffect(() => {
        if (nameInput && selectedAvt) {
            setSaveClass("save");
        } else {
            setSaveClass("save_disable");
        }

        if (createResult) {
            setCreateResult(undefined);

            const notify = {
                message: Date.now().toString(),
                id: Date.now().toString(),
                type: "success",
            };

            dispatch(pushNotify(notify));
            setTimeout(() => {
                dispatch(removeNotify(notify));
            }, 10000);
        }
    }, [nameInput, selectedAvt, createResult]);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };
    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionInput(e.target.value);
    };
    const onChangeExternalLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExternalLinkInput(e.target.value);
    };
    const changeAvtHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedAvt(event.target.files[0]);
        }
    };
    const removeAvtHandler = () => {
        setSelectedAvt(undefined);
    };
    //------
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const handleClose = () => {
        setOpenModal(false);
    };
    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        formData.append("File", selectedAvt);
        formData.append("name", nameInput);
        formData.append("description", descriptionInput);
        formData.append("externalLink", externalLinkInput);
        formData.append("properties", JSON.stringify(properties));
        // const newObject = {
        //     test1: "ac",
        //     test2: "ac",
        //     test3: {
        //         test: "adaf",
        //         aa: "ád",
        //     },
        // };
        // formData.append("postData", JSON.stringify(newObject));
        setTimeout(async () => {
            setCreateResult(await sendData(formData));
            console.log(formData);
        }, 5000);
        setSaveClass("save_disable");
    };

    return (
        <div className={styles.grid}>
            <div className={styles.form}>
                <div className={styles.title}>Create new item</div>

                <div>Require field {<RequestSymbol />}</div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="img">
                        Image, Video, Audio, or 3D Model {<RequestSymbol />}
                    </label>
                    <div
                        className={styles.img}
                        style={{
                            backgroundImage: `url(${
                                selectedAvt !== undefined
                                    ? URL.createObjectURL(selectedAvt)
                                    : ""
                            })`,
                        }}
                    >
                        <div className={styles.layout}></div>
                        <div className={styles.editIcon}>
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
                            id="img"
                            onChange={changeAvtHandler}
                        ></input>
                    </div>
                    <div className={styles.remove} onClick={removeAvtHandler}>
                        Remove Image
                    </div>
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="name">
                        Name {<RequestSymbol />}
                    </label>
                    <input
                        placeholder="Item name"
                        className={styles.input}
                        id="name"
                        type="text"
                        value={nameInput}
                        onChange={onChangeName}
                    ></input>
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="external_link">
                        External link
                    </label>
                    <input
                        placeholder="yoursite.host/asset/item"
                        className={styles.input}
                        id="external_link"
                        type="text"
                        value={externalLinkInput}
                        onChange={onChangeExternalLink}
                    ></input>
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="description">
                        Description
                    </label>
                    <textarea
                        placeholder="Enter item description"
                        className={styles.input}
                        id="description"
                        value={descriptionInput}
                        onChange={onChangeDescription}
                    ></textarea>
                </div>

                <div className={styles.group}>
                    <div className={styles.extraInfo}>
                        <div className={styles.icon}>
                            <ListIcon sx={{ fontSize: 24 }} />
                        </div>
                        <div className={styles.prop_title}>
                            <div className={styles.label}>Properties</div>
                            <div>Textual traits that show up as rectangles</div>
                        </div>
                        <div className={styles.addbtn} onClick={handleOpen}>
                            <div className={styles.addIcon}>+</div>
                        </div>
                    </div>
                    <div className={styles.properties}>
                        {properties &&
                            properties.map((item) => (
                                <div className={styles.property} key={item.id}>
                                    <div className={styles.type}>
                                        {sliceString(item.type, 10)}
                                    </div>
                                    <div className={styles.name}>
                                        {sliceString(item.name, 10)}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <Divider />
                </div>

                <div className={styles.group}>
                    <button
                        className={styles[saveClass]}
                        onClick={
                            saveClass === "save" ? handleSaveClick : undefined
                        }
                    >
                        Save
                    </button>
                </div>
            </div>
            <AddModal
                open={openModal}
                setOpen={setOpenModal}
                handleClose={handleClose}
                setProperties={setProperties}
                properties={properties}
            ></AddModal>
        </div>
    );
}
