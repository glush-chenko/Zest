import React, { useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getWeekDates} from "../../../utils/get-week-dates";
import dayjs from "dayjs";
import {selectValueCalendarDay, setDayOfWeek, updateValue} from './right-section-slice';

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
    const dispatch = useAppDispatch();
    const theme = useTheme();
    // const [value, setValue] = useState(0);
    const {dayOfWeek} = useAppSelector(selectValueCalendarDay);
    // const selectedDate =  useAppSelector(selectDate);
    // const dayOfWeek = selectedDate && selectedDate.day();
    const weekDates = getWeekDates();

    useEffect(() => {
        // setValue(dayjs().day());
        dispatch(setDayOfWeek(dayjs().day()));
        // dispatch(dayjs().day());
    }, [dispatch]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // setValue(newValue);
        // console.log(weekDates[newValue].format('MM-DD'))
        dispatch(setDayOfWeek(newValue));
        dispatch(updateValue(weekDates[newValue].format('MM-DD')));
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
                value={dayOfWeek}
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
                {/*<Tab label={`Mon`} />*/}
                {/*<Tab label="Tue" />*/}
                {/*<Tab label="Wed" />*/}
                {/*<Tab label="Thu" />*/}
                {/*<Tab label="Fri" />*/}
                {/*<Tab label="Sat" />*/}
                {/*<Tab label="Sun" />*/}
            </Tabs>
            {/*<Box flex={1} p={4}>*/}
            {/*    <Typography variant="h4">Content for the selected tab</Typography>*/}
            {/*</Box>*/}
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