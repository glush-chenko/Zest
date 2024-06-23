import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";

export interface LeftSectionState {
    open: boolean;

}

const initialState: LeftSectionState = {
    open: true
};

export const leftSectionSlice = createSlice({
    name: 'leftSectionSlice',
    initialState,
    reducers: {
        toggleDrawer: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
    },
});

export const { toggleDrawer } = leftSectionSlice.actions;
export const selectDrawerOpen = (state: RootState) => state.leftSectionSlice.open;

export default leftSectionSlice.reducer;