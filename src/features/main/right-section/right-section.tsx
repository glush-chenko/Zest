import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useTheme} from "@mui/material";

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         display: 'flex',
//         height: '100vh',
//         width: '300px',
//         backgroundColor: theme.palette.grey[200],
//     },
//     tabs: {
//         borderRight: `1px solid ${theme.palette.divider}`,
//     },
//     tabContent: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// }));

export const RightSection = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            width: '4rem',
            backgroundColor: theme.palette.mode === 'dark' ? "black" : "#f5f4f4f7",
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 'auto',
        }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                scrollButtons={false}
                onChange={handleChange}
                aria-label="scrollable prevent tabs"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    '& .MuiTabs-indicator': {
                        left: 0,
                        right: 'auto',
                        backgroundColor: theme.palette.secondary.dark,
                        width: "0.3rem",
                    },
                    '& .MuiTabs-scroller': {
                        position: "static",
                        display: "flex",
                        alignItems: "center",
                    },
                    '& .MuiTab-root': {
                        height: "7.5rem",
                    },
                }}
            >
                <Tab label="Mon" />
                <Tab label="Tue" />
                <Tab label="Wed" />
                <Tab label="Thu" />
                <Tab label="Fri" />
                <Tab label="Sat" />
                <Tab label="Sun" />
            </Tabs>
            {/*<Box>*/}
            {/*    {value === 0 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Monday</Typography>*/}
            {/*            <Typography>Content for Monday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    {value === 1 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Tuesday</Typography>*/}
            {/*            <Typography>Content for Tuesday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    {value === 2 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Wednesday</Typography>*/}
            {/*            <Typography>Content for Wednesday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    {value === 3 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Thursday</Typography>*/}
            {/*            <Typography>Content for Thursday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    {value === 4 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Friday</Typography>*/}
            {/*            <Typography>Content for Friday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    {value === 5 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Saturday</Typography>*/}
            {/*            <Typography>Content for Saturday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    {value === 6 && (*/}
            {/*        <Box>*/}
            {/*            <Typography variant="h6">Sunday</Typography>*/}
            {/*            <Typography>Content for Sunday</Typography>*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*</Box>*/}
        </Box>
    );
}