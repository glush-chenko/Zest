import type {Preview} from "@storybook/react";
import {ThemeProvider} from "@mui/material/styles";
import {Pallete} from "../src/theme/theme";
import { DocsPage, DocsContainer } from '@storybook/addon-docs';
import {CssBaseline} from "@mui/material";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            container: DocsContainer,
            page: DocsPage,
        }
    },
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        }
    },
    decorators: [
        (Story, context) => {
            const theme = Pallete[context.globals.theme || 'light'];
            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Story/>
                </ThemeProvider>
            );
        },
    ],
};

export default preview;