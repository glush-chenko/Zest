import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export enum SCREEN_NAMES {
    HOME = "HOME",
    TASKS = "TASKS",
    ACTIVITY = "ACTIVITY",
    ABOUT = "ABOUT"
}

export interface HeaderState {
    currentScreenName: SCREEN_NAMES,
    avatarSrc: string;
    goalForDay: number;
}

const initialState: HeaderState = {
    currentScreenName: SCREEN_NAMES.HOME,
    avatarSrc: "",
    goalForDay: 5,
};

export const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        setActiveScreen: (state, action) => {
            state.currentScreenName = action.payload;
        },
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
    setActiveScreen,
    setAvatarSrc,
    setGoalForDay,
} = headerSlice.actions;
export const selectHeader = (state: RootState) => state.headerSlice;

export default headerSlice.reducer;