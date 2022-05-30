import { configureStore } from '@reduxjs/toolkit';
import allNFTsSlice  from '../features/allNFTs/allNFTsSlice';
import menuCriteriaSlice from "../features/allNFTs/components/menuSide/menuCriteriaSlice"

export const store = configureStore({
  reducer: {
    allNFTs: allNFTsSlice,
    menuCriteria: menuCriteriaSlice
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch;

export default store