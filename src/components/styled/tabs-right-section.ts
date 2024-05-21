import {styled} from "@mui/material";
import Tabs from "@mui/material/Tabs";

export const TabsRightSection = styled(Tabs)(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    '& .MuiTabs-indicator': {
        left: 0,
        right: '0',
        backgroundColor: theme.palette.secondary.dark,
        width: "0.3rem",
    },
    '& .MuiTabs-scroller': {
        position: "static",
        display: "flex",
        alignItems: "center",
    },
    "& .css-lfwcke-MuiTabs-flexContainer": {
        height: "100vh",
    }
}));