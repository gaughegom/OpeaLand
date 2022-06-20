import * as React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./navigateStyles.module.scss";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import GridOnIcon from "@mui/icons-material/GridOn";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  ALL_NFTS_PATH,
  ALL_COLLECTIONS_PATH,
  PROFILE_PATH,
  LOGIN_PATH,
  CREATE_NFT_PATH
} from "../../../../routes";
import { walletConnector } from "../../../wallet/walletConnector";
import {
  useAppDispatch,
  useAppSelector,
  useDetectWalletChange
} from "../../../../hooks";
import { setWalletProvider, WalletProvider } from "../../../wallet/walletSlice";
import {
  pushNotify,
  removeNotify
} from "../../../../components/Notify/notifySlice";

export default function Navigate() {
  const navigate = useNavigate();

  const exploreItem = [
    {
      iconLink: "https://opensea.io/static/images/icons/allnfts-light.svg",
      title: "All NFTs",
      path: ALL_NFTS_PATH
    },
    {
      iconLink: "https://opensea.io/static/images/icons/collectibles-light.svg",
      title: "Collectibles",
      path: ALL_COLLECTIONS_PATH
    }
  ];
  // const statsItem = [
  //     { title: "Rankings", path: "" },
  //     { title: "Activities", path: "" },
  // ];

  const userItem = [
    {
      iconLink: <PersonIcon sx={{ fontSize: 24 }} />,
      title: "Profile",
      path: PROFILE_PATH
    },
    // {
    //     iconLink: <FavoriteBorderIcon sx={{ fontSize: 24 }} />,
    //     title: "Favories",
    //     path: ''
    // },
    // {
    //     iconLink: <GridOnIcon sx={{ fontSize: 24 }} />,
    //     title: "My Collections",
    //     path: ''
    // },
    {
      iconLink: <LogoutIcon sx={{ fontSize: 24 }} />,
      title: "Log Out",
      path: LOGIN_PATH
    }
  ];
  //   const walletItem = [{ iconLink: "", title: "" }];

  const dispatch = useAppDispatch();

  // const [wallet, setWallet] = React.useState<WalletProvider>();
  const [isLoadWallet, setIsLoadWallet] = React.useState(false);

  const loadWallet = async () => {
    dispatch(setWalletProvider(await walletConnector()));
  };

  useDetectWalletChange();

  React.useEffect(() => {
    loadWallet();
  }, [isLoadWallet]);

  const signer = useAppSelector((state) => state.wallet.signer);
  const handleClickConnect = async () => {
    setIsLoadWallet(!isLoadWallet);
  };

  return (
    <div className={styles.navigate}>
      <div className={styles.item}>
        <p>Explore</p>
        <div className={styles["dropDownContent--left"]}>
          {exploreItem.map((item, key) => (
            <div
              onClick={() => navigate(item.path)}
              key={key}
              className={styles.dropDownItem}
            >
              <div
                className={styles.icon}
                style={{
                  backgroundImage: `url(${item.iconLink})`
                }}
              ></div>
              <p className={styles.title}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className={styles.item}>
                <p>Stats</p>
                <div className={styles["dropDownContent--left"]}>
                    {statsItem.map((item, key) => (
                        <p onClick={() => navigate(item.path)} key={key} className={styles.dropDownItem}>
                            {item.title}
                        </p>
                    ))}
                </div>
            </div> */}

      <div className={styles.item} onClick={() => navigate(CREATE_NFT_PATH)}>
        <p>Create</p>
      </div>

      <div className={styles.item}>
        <AccountCircleOutlinedIcon sx={iconButtonStyles} />
        <div className={styles["dropDownContent--right"]}>
          {userItem.map((item, key) => (
            <div
              onClick={() => {
                navigate(item.path);
                if (item.path === LOGIN_PATH) {
                  const notify = {
                    id: Date.now().toString(),
                    type: "success",
                    message: "Logout succesfully."
                  };
                  dispatch(pushNotify(notify));
                  setTimeout(() => {
                    dispatch(removeNotify(notify));
                  }, 5000);
                }
              }}
              key={key}
              className={styles.dropDownItem}
            >
              <div className={styles.icon}>{item.iconLink}</div>
              <p className={styles.title}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.item} onClick={handleClickConnect}>
        <AccountBalanceWalletOutlinedIcon sx={iconButtonStyles} />
        {/* <div className={styles["dropDownContent--right"]}>
                    {walletItem.map((item, key) => (
                        <div key={key} className={styles.dropDownItem}>
                            <div
                                className={styles.icon}
                                style={{
                                    backgroundImage: `url(${item.iconLink})`,
                                }}
                            ></div>
                            <p className={styles.title}>{item.title}</p>
                        </div>
                    ))}
                </div> */}
      </div>
    </div>
  );
}

const iconButtonStyles = {
  fontSize: 32,
  color: "rgba(4, 17, 29, 0.75)"
};
