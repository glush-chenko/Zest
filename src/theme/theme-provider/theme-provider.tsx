import React, {ReactNode, useEffect} from 'react';
import {ThemeProvider as MUIThemeProvider} from "@mui/material/styles";
import {selectTheme, toggleTheme} from "./theme-provider-slice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Pallete} from "../theme";

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(selectTheme);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch(toggleTheme(prefersDarkMode ? 'dark' : 'light'));
    }, []);

    const theme = Pallete[mode];

    return (
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    );
};

// ThemeProvider.propTypes = {
//     children: PropTypes.node,
// };