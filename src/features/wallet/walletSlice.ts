import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import { IWalletModel } from "../../model/Wallet.model";
import { RootState } from "../../redux/store";

//Defining our initialState's type
export interface WalletProvider {
  address: string | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  balance: BigNumber | undefined;
  walletInfo: IWalletModel | undefined;
}

export interface WalletUser extends WalletProvider {
  imageUrl: string;
  displayName: string;
}

const initialState: WalletProvider = {
  address: undefined,
  signer: undefined,
  balance: undefined,
  walletInfo: undefined
};

export const ethSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {
    setWalletProvider: (
      state,
      action: PayloadAction<WalletProvider | undefined>
    ) => {
      state.signer = action.payload?.signer;
      state.address = action.payload?.address;
      state.balance = action.payload?.balance;
      state.walletInfo = action.payload?.walletInfo;
    }
  }
});

// To able to use reducers we need to export them.
export const { setWalletProvider } = ethSlice.actions;

//Selector to access bookList state.
export const selectState = (state: RootState) => state.wallet;

export default ethSlice.reducer;
