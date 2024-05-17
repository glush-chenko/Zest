import { styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {closedMixin, openedMixin} from "./sliding-panel";
export const DRAWER_WIDTH = 200;

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            '& ::-webkit-scrollbar': {
                width: '0.6rem',
            },
            '& ::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[500],
                borderRadius: '4px',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            '& ::-webkit-scrollbar': {
                width: '0.5rem',
            },
            '& ::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[500],
                borderRadius: '4px',
            },
        }),
    }),
);