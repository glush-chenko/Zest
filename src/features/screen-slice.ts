import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import {RootState} from "../app/store";
import {useTheme} from "@mui/material";

const theme = { breakpoints: { values: { sm: 600, md: 900, lg: 1200, xl: 1536 } } };

export const screenSlice = createSlice({
    name: 'screenSlice',
    initialState: {
        screenWidth: window.innerWidth,
    },
    reducers: {
        setScreenWidth: (state, action) => {
            state.screenWidth = action.payload;
        }
    },
});

export const { setScreenWidth} = screenSlice.actions;

export const selectScreenSizes = createSelector(
    [(state: RootState) => state.screenSlice.screenWidth],
    (screenWidth) => {
        return {
            isSmall: screenWidth < theme.breakpoints.values.sm,
            isMedium: screenWidth < theme.breakpoints.values.md,
            isLarge: screenWidth < theme.breakpoints.values.lg,
            isExtraLarge: screenWidth >= theme.breakpoints.values.xl,
        }
    }
)

export default screenSlice.reducer;