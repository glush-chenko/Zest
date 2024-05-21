import {styled} from "@mui/material";
import Tab from "@mui/material/Tab";

export const TabRightSection = styled(Tab)(({ theme }) => ({
    justifyContent: 'center',
    textAlign: 'center',
    flexGrow: 1,
    padding: theme.spacing(2),
    minHeight: 'auto',
    '& .Mui-selected': {
        fontWeight: theme.typography.fontWeightBold,
    },
}));