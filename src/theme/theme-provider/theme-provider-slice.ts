import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {PaletteMode} from "@mui/material";

export interface ThemeState {
    theme: PaletteMode
}

const initialState: ThemeState = {
    theme: 'light'
};

export const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: (state, action: PayloadAction<PaletteMode | undefined>) => {
            state.theme = action.payload ? action.payload : state.theme === 'light' ? 'dark' : 'light';
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.themeSlice.theme;

export default themeSlice.reducer;