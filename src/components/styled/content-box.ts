import Box from '@mui/material/Box';
import {styled} from "@mui/material";

export const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    flex: 1,
    padding: "5rem",
}));