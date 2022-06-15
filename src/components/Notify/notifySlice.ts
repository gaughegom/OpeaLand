import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import { NotifyProps } from "./index";
//Defining our initialState's type
type initialStateType = {
    notiStack: NotifyProps[];
};

const initialState: initialStateType = {
    notiStack: [] as NotifyProps[],
};

export const notifySlice = createSlice({
    name: "notifySlice",
    initialState,
    reducers: {
        pushNotify: (state, action: PayloadAction<NotifyProps>) => {
            if (action.payload) state.notiStack.push(action.payload);
        },
        removeNotify: (state, action: PayloadAction<NotifyProps>) => {
            state.notiStack = state.notiStack.filter(
                (item) => item.id !== action.payload.id
            );
        },
    },
});

// To able to use reducers we need to export them.
export const { pushNotify, removeNotify } = notifySlice.actions;

//Selector to access bookList state.
export const selectState = (state: RootState) => state.notify;

export default notifySlice.reducer;
