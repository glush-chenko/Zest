import React, { useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useTheme} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {getWeekDates} from "../../../utils/get-week-dates";
import {updateSelectedDate} from './right-section-slice';

export const RightSection = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const weekDates = getWeekDates();

    useEffect(() => {
        const day = new Date().getDay();
        setValue((day + 6) % 7)
    }, [dispatch]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        dispatch(updateSelectedDate(weekDates[newValue].valueOf()));
    };

    return (
        <Box sx={{
            display: 'flex',
            width: '4rem',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            left: 'auto',
            position: "relative",
            borderLeft: `1px solid ${theme.palette.divider}`
        }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="scrollable prevent tabs"
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    '& .MuiTabs-indicator': {
                        left: 0,
                        width: "0.3rem",
                    },
                    '& .MuiTabs-scroller': {
                        position: "static",
                        display: "flex",
                        alignItems: "center",
                    },
                    "& .MuiTabs-flexContainer": {
                        height: "100%",
                    },
                    "& .MuiTab-root": {
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexGrow: 1,
                        padding: theme.spacing(2),
                        minHeight: 'auto',
                        '& .Mui-selected': {
                            fontWeight: theme.typography.fontWeightBold,
                        },
                    }
                }}
            >
                {weekDates.map((date, index) => (
                    <Tab
                        key={index}
                        label={
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: "1rem"
                            }}>
                                <span>{date?.format('ddd')}</span>
                                <span>{date?.format('D')}</span>
                            </Box>
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}