import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

//Defining our initialState's type
type initialStateType = {
  open: boolean
};

const initialState: initialStateType = {
  open: false,
};

export const allNFTsSlice = createSlice({
  name: 'allNFTsSlice',
  initialState,
  reducers: {
    openHandle: (state, /*action: PayloadAction<initialStateType>*/) => {
      state.open = true;
    },
    closeHandle: (state, /*action: PayloadAction<initialStateType>*/) => {
      state.open = false;
    },
  },
});

// To able to use reducers we need to export them.
export const { openHandle,closeHandle } = allNFTsSlice.actions;

//Selector to access bookList state.
export const selectState = (state: RootState) => state.allNFTs;

export default allNFTsSlice.reducer;
