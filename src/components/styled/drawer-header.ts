import { styled} from '@mui/material/styles';

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.themeSwitch.lightThumb,
    height: "4.4rem",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));