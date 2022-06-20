import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

//Defining our initialState's type

type initialStateType = {
    properties: { [index: string]: number };
};

const initialState: initialStateType = {
    properties: {},
};

export const createNFTSlice = createSlice({
    name: "createNFTSlice",
    initialState,
    reducers: {
        setProperties: (state, action: PayloadAction<any>) => {
            const keys = Object.keys(action.payload).filter(
                (key) => action.payload[key]
            );

            for (var key in keys) {
                state.properties[key] = action.payload[key];
            }
        },
    },
});

// To able to use reducers we need to export them.
export const {} = createNFTSlice.actions;

//Selector to access bookList state.
export const selectState = (state: RootState) => state.createNFT;

export default createNFTSlice.reducer;
