import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { RootState } from "../../redux/store";

//Defining our initialState's type
export interface WalletProvider {
  address: string | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  provider: ethers.providers.Web3Provider | undefined;
}

export interface WalletUser extends WalletProvider {
  imageUrl: string;
  displayName: string;
}

const initialState: WalletProvider = {
  address: undefined,
  signer: undefined,
  provider: undefined
};

export const ethSlice = createSlice({
  name: "ethSlice",
  initialState,
  reducers: {
    setWalletProvider: (
      state,
      action: PayloadAction<WalletProvider | undefined>
    ) => {
      state.signer = action.payload?.signer;
      state.provider = action.payload?.provider;
      state.address = action.payload?.address;
    },
    setSigner: (
      state,
      action: PayloadAction<ethers.providers.JsonRpcSigner | undefined>
    ) => {
      state.signer = action.payload;
    },
    setAddress: (state, action: PayloadAction<WalletProvider | undefined>) => {
      state.address = action.payload?.address;
    }
  }
});

// To able to use reducers we need to export them.
export const { setAddress, setWalletProvider, setSigner } = ethSlice.actions;

//Selector to access bookList state.
export const selectState = (state: RootState) => state.eth;

export default ethSlice.reducer;
