import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../redux/store";

//Defining our initialState's type
import { CriteriaData } from "../criteria";

type initialStateType = {
    criteriasList: CriteriaData[];
};

const initialState: initialStateType = {
    criteriasList: [
        {
            title: "Buy now",
            value: "Buy now",
            criteria: "status",
            key: "Buy now",
            checked: false,
        },
        {
            title: "On Auction",
            value: "On Auction",
            criteria: "status",
            key: "On Auction",
            checked: false,
        },
        {
            title: "Min",
            value: "",
            criteria: "price",
            key: "Min",
            checked: false,
        },
        {
            title: "Max",
            value: "",
            criteria: "price",
            key: "Max",
            checked: false,
        },
    ],
};

export const menuCriteriaSlice = createSlice({
    name: "menuAllNFTsCriteriaSlice",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CriteriaData>) => {
            state.criteriasList.forEach((item) => {
                if (item.key === action.payload.key) {
                    item.checked = true;
                }
            });
        },
        remove: (state, action: PayloadAction<CriteriaData>) => {
            state.criteriasList.forEach((item) => {
                if (item.key === action.payload.key) {
                    item.checked = false;
                    if (action.payload.criteria === "price") {
                        item.value = "";
                    }
                }
            });
        },
        changePrice: (state, action: PayloadAction<CriteriaData>) => {
            state.criteriasList.forEach((item) => {
                if (item.key === action.payload.key) {
                    item.value = action.payload.value;
                    item.checked = true
                }
            });
        },
    },
});

// To able to use reducers we need to export them.
export const { add, remove, changePrice } = menuCriteriaSlice.actions;

//Selector to access bookList state.
export const selectState = (state: RootState) => state.menuAllNFTsCriteria;

export default menuCriteriaSlice.reducer;
