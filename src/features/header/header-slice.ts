import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface HeaderState {
    open: boolean;
    productivityOpen: boolean;
    src: string;
}

const initialState: HeaderState = {
    open: false,
    productivityOpen: false,
    src: "",
};

export const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        toggleHeaderProfile: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        toggleHeaderProductivity: (state, action: PayloadAction<boolean>) => {
            state.productivityOpen = action.payload;
        },
        setImageSrc: (state, action: PayloadAction<string>) => {
            state.src = action.payload;
            localStorage.setItem('avatarSrc', action.payload);
        },
    },
});

export const {
    toggleHeaderProfile,
    setImageSrc,
    toggleHeaderProductivity
} = headerSlice.actions;
export const selectHeader = (state: RootState) => state.headerSlice;

export default headerSlice.reducer;