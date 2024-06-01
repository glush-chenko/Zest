import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import dayjs from "dayjs";

export interface RightSectionState {
    selectedDate: number;
}

const initialState: RightSectionState = {
    selectedDate: dayjs().startOf('day').valueOf(),
};

export const rightSectionSlice = createSlice({
    name: 'rightSectionSlice',
    initialState,
    reducers: {
        updateSelectedDate: (state, action: PayloadAction<number>) => {
            state.selectedDate = action.payload;
        },
    },
});

export const { updateSelectedDate } = rightSectionSlice.actions;
export const selectRightSection = (state: RootState) => state.rightSectionSlice;

export default rightSectionSlice.reducer;