import { configureStore } from '@reduxjs/toolkit';
import allNFTsSlice  from '../features/allNFTs/allNFTsSlice';
import collectionSlice from '../features/collection/collectionSlice'
import menuAllNFTsCriteriaSlice from "../features/allNFTs/components/menuSide/menuCriteriaSlice"
import menuCollectionCriteriaSlice from "../features/collection/components/menuSide/menuCriteriaSlice"

export const store = configureStore({
  reducer: {
    allNFTs: allNFTsSlice,
    menuAllNFTsCriteria: menuAllNFTsCriteriaSlice,
    menuCollectionCriteria: menuCollectionCriteriaSlice,
    collection: collectionSlice
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch;

export default store