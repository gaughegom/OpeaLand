import React from "react";

import styles from "./createCollectionStyles.module.scss";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ListIcon from "@mui/icons-material/List";
import Divider from "@mui/material/Divider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import { sendData } from "./helper";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { pushNotify, removeNotify } from "../../components/Notify/notifySlice";
import formatAddress from "../../utils/formatAddress";

import { sliceString } from "../../utils/strimString";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import { ethers } from "ethers";

// contract import
import { contractAddresses } from "../../config";
import ERC721Default from "../../abi/contracts/token/ERC721Default.sol/ERC721Default.json";
import ExchangeSell from "../../abi/contracts/exchange/ExchangeSell.sol/ExchangeSell.json";

function RequestSymbol() {
  return <span className={styles.require}>*</span>;
}

export default function CreateNFT() {
  const dispatch = useAppDispatch();

  const [saveClass, setSaveClass] = React.useState("save_disable");
  const [createResult, setCreateResult] = React.useState<any>(undefined);

  const [selectedAvt, setSelectedAvt] = React.useState<any>(undefined);
  const [bannerInput, setBannerInput] = React.useState<any>(undefined);
  const [nameInput, setNameInput] = React.useState<string>("");
  const [descriptionInput, setDescriptionInput] = React.useState<string>("");

  const currentSigner = useAppSelector((state) => state.wallet.signer);
  React.useEffect(() => {
    // styling save button
    if (nameInput && selectedAvt && bannerInput) {
      setSaveClass("save");
    } else {
      setSaveClass("save_disable");
    }
    // set result
    if (createResult) {
      const notify = {
        message: createResult.message,
        id: Date.now().toString(),
        type: createResult.type
      };

      setCreateResult(undefined);
      dispatch(pushNotify(notify));
      setTimeout(() => {
        dispatch(removeNotify(notify));
      }, 10000);
    }
  }, [nameInput, selectedAvt, bannerInput, createResult, currentSigner]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.target.value);
  };
  const changeAvtHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedAvt(event.target.files[0]);
    }
  };
  const removeBannerHandler = () => {
    setSelectedAvt(undefined);
  };
  const changeBannerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setBannerInput(event.target.files[0]);
    }
  };
  const removeAvtHandler = () => {
    setBannerInput(undefined);
  };
  //------

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("fileLogo", selectedAvt);
    formData.append("fileBanner", bannerInput);
    formData.append("name", nameInput);
    formData.append("description", descriptionInput);

    //fake
    formData.append("token", "asdfaserfasdf");

    setTimeout(async () => {
      setCreateResult(await sendData(formData));
      console.log(formData);
    }, 5000);
    setSaveClass("save_disable");
  };

  return (
    <div className={styles.grid}>
      <div className={styles.form}>
        <div className={styles.title}>Create new collection</div>

        <div>Require field {<RequestSymbol />}</div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="img">
            Logo: Image, Video, Audio, or 3D Model {<RequestSymbol />}
          </label>
          <div
            className={styles.logo}
            style={{
              backgroundImage: `url(${
                selectedAvt !== undefined
                  ? URL.createObjectURL(selectedAvt)
                  : ""
              })`
            }}
          >
            <div className={styles.layout}></div>
            <div className={styles.editIcon}>
              <ModeEditIcon
                sx={{
                  fontSize: 32,
                  color: "white"
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
          <label className={styles.label} htmlFor="banner">
            Banner: Image, Video, Audio, or 3D Model {<RequestSymbol />}
          </label>
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${
                bannerInput !== undefined
                  ? URL.createObjectURL(bannerInput)
                  : ""
              })`
            }}
          >
            <div className={styles.layout}></div>
            <div className={styles.editIcon}>
              <ModeEditIcon
                sx={{
                  fontSize: 32,
                  color: "white"
                }}
              ></ModeEditIcon>
            </div>
            <input
              className={styles.loadFile}
              type="file"
              accept="image/*"
              id="banner"
              onChange={changeBannerHandler}
            ></input>
          </div>
          <div className={styles.remove} onClick={removeBannerHandler}>
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
          <button
            className={styles[saveClass]}
            onClick={saveClass === "save" ? handleSaveClick : undefined}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
