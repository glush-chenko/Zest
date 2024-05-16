import React, {ReactNode, useEffect, useState} from 'react';
import {ThemeContextType} from "../../types/theme-context-type";
import {createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main: '#9ed079',
            },
            secondary: {
                main: '#a276d8',
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

// ThemeProvider.propTypes = {
//     children: PropTypes.node,
// };