import React from "react";

import styles from "./createNFTStyles.module.scss";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ListIcon from "@mui/icons-material/List";
import Divider from "@mui/material/Divider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

import AddModal from "./addModal";

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
import SvgEthIcon from "../svg/svgEthIcon";
import { isValid } from "date-fns/esm";

function RequestSymbol() {
  return <span className={styles.require}>*</span>;
}

export default function CreateNFT() {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.wallet);

  const [saveClass, setSaveClass] = React.useState("save_disable");
  const [isLoading, setIsLoading] = React.useState(false);
  const [createResult, setCreateResult] = React.useState<any>(undefined);
  const [myCollections, setMyCollections] = React.useState<
    { collectionName: string; address: string }[]
  >([]);
  const statuses = [
    {
      status: "Sell",
      value: 1
    },
    {
      status: "Auction",
      value: 2
    }
  ];

  const [selectedAvt, setSelectedAvt] = React.useState<any>(undefined);
  const [nameInput, setNameInput] = React.useState<string>("");
  const [descriptionInput, setDescriptionInput] = React.useState<string>("");
  const [priceInput, setPriceInput] = React.useState<number>(0.001);
  const [collectionInput, setCollectionInput] = React.useState<string>("");
  const [statusInput, setStatusInput] = React.useState<number>(1);
  const [endAtInput, setEndAtInput] = React.useState<Date | null>(
    new Date(Date.now())
  );
  const [properties, setProperties] = React.useState<
    { type: string; name: string; id: string }[]
  >([]);

  const SelectCustom = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
      borderRadius: 12,
      border: "1px solid rgb(229 232 235)",
      fontSize: 14,
      padding: "16px 26px 10px 12px",
      "&:focus": {
        borderRadius: 12,
        border: "2px solid rgb(229 232 235)"
      }
    }
  }));

  const currentSigner = useAppSelector((state) => state.wallet.signer);
  React.useEffect(() => {
    var isValidTime = false;
    if (statusInput === 1) {
      isValidTime = true;
    } else {
      if (endAtInput && endAtInput > new Date(Date.now())) {
        isValidTime = true;
      } else {
        isValidTime = false;
      }
    }
    // styling save button
    if (nameInput && selectedAvt && priceInput && isValidTime) {
      setSaveClass("save");
    } else {
      setSaveClass("save_disable");
    }
    // set result
    if (createResult) {
      setIsLoading(false);

      const notify = {
        message: createResult.message,
        id: Date.now().toString(),
        type: createResult.status
      };

      setCreateResult(undefined);

      dispatch(pushNotify(notify));
      setTimeout(() => {
        dispatch(removeNotify(notify));
      }, 5000);
    }
  }, [
    nameInput,
    selectedAvt,
    priceInput,
    createResult,
    collectionInput,
    statusInput,
    endAtInput,
    currentSigner
  ]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.target.value);
  };
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("-")) setPriceInput(0);
    else setPriceInput(+e.target.value);
  };
  const changeAvtHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedAvt(event.target.files[0]);
    }
  };
  const onChangeCollection = (event: SelectChangeEvent) => {
    setCollectionInput(event.target.value);
  };
  const onChangeStatus = (event: SelectChangeEvent) => {
    setStatusInput(+event.target.value);
  };
  const onChangeEndAt = (newValue: Date | null) => {
    if (newValue) {
      if (newValue < new Date(Date.now())) {
        const notify = {
          id: Date.now().toString(),
          message: "End time must greater now",
          type: "error"
        };
        dispatch(pushNotify(notify));
        setTimeout(() => {
          dispatch(removeNotify(notify));
        }, 5000);
      } else {
        setEndAtInput(newValue);
      }
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
    formData.append("owner", me.address || "");
    // owner display
    formData.append("file", selectedAvt);
    formData.append("name", nameInput);
    formData.append("description", descriptionInput);
    formData.append(
      "price",
      ethers.utils.parseEther(priceInput.toString()).toString()
    );
    formData.append("properties", JSON.stringify(properties));
    formData.append(
      "collectionAddress",
      collectionInput ? collectionInput : contractAddresses.erc721
    );
    formData.append("status", statusInput.toString());
    if (statusInput === 1) formData.append("endAt", "");
    else
      formData.append(
        "endAt",
        endAtInput ? endAtInput.valueOf().toString() : ""
      );

    // const newObject = {
    //     test1: "ac",
    //     test2: "ac",
    //     test3: {
    //         test: "adaf",
    //         aa: "ád",
    //     },
    // };
    // formData.append("postData", JSON.stringify(newObject));

    // load contract
    //   const erc721DefaultContract = new ethers.Contract(contractAddresses.erc721Default, ERC721Default.abi, currentSigner)
    // const exchangeSellContract = new ethers.Contract(contractAddresses.exchangeSell, ExchangeSell.abi, currentSigner);

    //   // mint token
    //   const txMint = await erc721DefaultContract.mint('ipfs://test.com');
    //   const txReceipt = await txMint.wait();
    //   var tokenId = txReceipt.events[2].args[1].toString()

    // const txList = await exchangeSellContract.list(contractAddresses.erc721, tokenId, ethers.utils.parseEther('0.002'))
    // const txListReceipt = await txList.wait();

    // console.log(txList)
    // console.log(txListReceipt)

    setSaveClass("save_disable");
    setIsLoading(true);
    setCreateResult(await sendData(formData));
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
          <label className={styles.label} htmlFor="price">
            Price {<RequestSymbol />}
          </label>
          <div className={styles.input_area}>
            <input
              className={styles.input}
              id="price"
              type="number"
              min={0.001}
              value={priceInput}
              onChange={onChangePrice}
            ></input>
            <span>
              <SvgEthIcon
                style={{ marginRight: "8px", width: "16px", height: "16px" }}
              />
            </span>
          </div>
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
          <label className={styles.label} htmlFor="status">
            Status
          </label>
          <Select
            label="Select item status"
            input={<SelectCustom></SelectCustom>}
            labelId="status"
            name="status"
            value={statusInput.toString()}
            onChange={onChangeStatus}
            inputProps={{ "aria-label": "Without label" }}
          >
            {statuses.length === 0 ? (
              <MenuItem value="">
                <div className={styles.select_item_noresult}>
                  <p>No result</p>
                </div>
              </MenuItem>
            ) : (
              statuses.map((item, idx) => (
                <MenuItem value={item.value} key={idx}>
                  <div className={styles.select_item}>
                    <p>{item.status}</p>
                  </div>
                </MenuItem>
              ))
            )}
          </Select>
        </div>

        {statusInput === 2 && (
          <div className={styles.group}>
            <label className={styles.label} htmlFor="endAt">
              End time
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={endAtInput}
                onChange={onChangeEndAt}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        )}

        <div className={styles.group}>
          <label className={styles.label} htmlFor="collection">
            Collection
          </label>
          <Select
            label="Select your collection"
            input={<SelectCustom></SelectCustom>}
            labelId="collection"
            name="collection"
            value={collectionInput}
            onChange={onChangeCollection}
            inputProps={{ "aria-label": "Without label" }}
          >
            {myCollections.length === 0 ? (
              <MenuItem value="">
                <div className={styles.select_item_noresult}>
                  <p>No result</p>
                </div>
              </MenuItem>
            ) : (
              myCollections.map((item, idx) => (
                <MenuItem value={item.address} key={idx}>
                  <div className={styles.select_item}>
                    <p>{item.collectionName}</p>
                    <p>{formatAddress(item.address)}</p>
                  </div>
                </MenuItem>
              ))
            )}
          </Select>
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
            onClick={saveClass === "save" ? handleSaveClick : undefined}
          >
            {isLoading ? "Loading..." : "Save"}
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
