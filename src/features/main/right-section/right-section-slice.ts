import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import dayjs from "dayjs";

export interface RightSectionState {
    valueCalendarDay: string;
    dayOfWeek: number;
}

const initialState: RightSectionState = {
    valueCalendarDay: `${dayjs().format('MM-DD')}`,
    dayOfWeek: 0,
};

export const rightSectionSlice = createSlice({
    name: 'leftSectionSlice',
    initialState,
    reducers: {
        setDayOfWeek: (state, action: PayloadAction<number>) => {
            state.dayOfWeek = action.payload
        },
        updateValue: (state, action: PayloadAction<string>) => {
            state.valueCalendarDay = action.payload;
        },
    },
});

export const { updateValue, setDayOfWeek } = rightSectionSlice.actions;
export const selectValueCalendarDay = (state: RootState) => state.rightSectionSlice;

export default rightSectionSlice.reducer;