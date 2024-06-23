import { createTheme } from '@mui/material/styles';
import {SimplePaletteColorOptions} from "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
    interface Palette {
        themeSwitch: {
            darkTrack: string,
            lightTrack: string,
            darkThumb: string,
            lightThumb: string,
        };
        beige: SimplePaletteColorOptions;
        violet: SimplePaletteColorOptions;
    }

    interface PaletteOptions {
        themeSwitch?: {
            darkTrack?: string;
            lightTrack?: string;
            darkThumb?: string;
            lightThumb?: string;
        };
        beige: SimplePaletteColorOptions;
        violet: SimplePaletteColorOptions;
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7165be',
            // main: '#9381E7',
            contrastText: '#fff',
        },
        secondary: {
            main: '#eabe50',
            contrastText: '#000',
        },
        text: {
            primary: '#000',
        },
        themeSwitch: {
            darkTrack: '#8796A5',
            lightTrack: '#aab4be',
            darkThumb: '#2754a4',
            lightThumb: '#eabe50',
        },
        beige: {
            main: '#edebe7',
        },
        violet: {
            main: '#7e4af5',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7060bd',
            contrastText: '#fff',
        },
        secondary: {
            main: '#9343F1FF',
            contrastText: '#000',
        },
        text: {
            primary: '#fff',
        },
        themeSwitch: {
            darkTrack: '#8796A5',
            lightTrack: '#aab4be',
            darkThumb: '#2754a4',
            lightThumb: '#eabe50',
        },
        beige: {
            main: '#edebe7',
        },
        violet: {
            main: '#7e4af5',
        },
    },
});

export const Pallete = {
    light: lightTheme,
    dark: darkTheme,
};