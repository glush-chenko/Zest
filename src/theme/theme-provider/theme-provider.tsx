import React, {ReactNode, useEffect, useState} from 'react';
import {createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import {selectTheme, toggleTheme} from "./theme-provider-slice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

declare module '@mui/material/styles' {
    interface Palette {
        themeSwitch: {
            darkTrack: string,
            lightTrack: string,
            darkThumb: string,
            lightThumb: string
        };
    }
    interface PaletteOptions {
        themeSwitch?: {
            darkTrack?: string;
            lightTrack?: string;
            darkThumb?: string;
            lightThumb?: string;
        };
    }
}

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(selectTheme);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch(toggleTheme(prefersDarkMode ? 'dark' : 'light'));
    }, []);

    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main: '#9ed079',
                // contrastText: "#fff",
            },
            secondary: {
                main: mode === "light" ? '#eabe50' : "#a276d8",
                contrastText: "#000"
            },
            text: {
                primary: mode === "light" ? "#000" : "#fff"
            },
            themeSwitch: {
                darkTrack: '#8796A5',
                lightTrack: '#aab4be',
                darkThumb: '#2754a4',
                lightThumb: '#eabe50'
            }
        },
    });

    return (
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    );
};

// ThemeProvider.propTypes = {
//     children: PropTypes.node,
// };