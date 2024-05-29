import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface HeaderState {
    open: boolean;
    src: string;
}

const initialState: HeaderState = {
    open: false,
    src: "",
};

export const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        toggleHeaderProfile: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setImageSrc: (state, action: PayloadAction<string>) => {
            state.src = action.payload;
        },
    },
});

export const { toggleHeaderProfile, setImageSrc } = headerSlice.actions;
export const selectHeader = (state: RootState) => state.headerSlice;

export default headerSlice.reducer;