import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface HeaderState {
    avatarSrc: string;
    goalForDay: number;
}

const initialState: HeaderState = {
    avatarSrc: "",
    goalForDay: 5,
};

export const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        setAvatarSrc: (state, action: PayloadAction<string>) => {
            state.avatarSrc = action.payload;
            localStorage.setItem('avatarSrc', action.payload);
        },
        setGoalForDay: (state, action: PayloadAction<number>) => {
            state.goalForDay = action.payload;
            localStorage.setItem('goal', `${action.payload}`);
        }
    },
});

export const {
    setAvatarSrc,
    setGoalForDay,
} = headerSlice.actions;
export const selectHeader = (state: RootState) => state.headerSlice;

export default headerSlice.reducer;