import React, {useCallback, useEffect, useMemo} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getWeekDates} from "../../../utils/get-week-dates";
import {updateSelectedDate} from './right-section-slice';
import Tooltip from "@mui/material/Tooltip";
import {selectTasks} from "../../../components/task/task-slice";
import {useNavigate} from "react-router-dom";
import dayjs, {Dayjs} from "dayjs";
import {selectTodoistTasks} from "../../../api/todoist-api";
import {token} from "../../../utils/auth";

export const RightSection = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);
    const {tasks} = useAppSelector(selectTasks);
    const tasksAPI = useAppSelector(selectTodoistTasks);
    const weekDates = getWeekDates();

    useEffect(() => {
        const day = new Date().getDay();
        setValue((day + 6) % 7);
    }, [dispatch]);

    const handleChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        dispatch(updateSelectedDate(weekDates[newValue].startOf('day').valueOf()));
        navigate("/tasks")
    }, [dispatch, weekDates, navigate]);

    const getActiveTasksForDate = useCallback((date: Dayjs) => {
        if (token) {
            return tasksAPI.filter((task) => dayjs(task.scheduledDate).isSame(date, 'day') && !task.completed);
        } else {
            return tasks.filter((task) => dayjs(task.scheduledDate).isSame(date, 'day') && !task.completed);
        }
    }, [tasks, tasksAPI, token]);

    const handleClickTab = useCallback(() => {
        navigate("/tasks");
    }, [navigate]);

    return (
        <Box sx={{
            display: 'flex',
            width: '4rem',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            left: 'auto',
            position: "relative",
            [theme.breakpoints.down('sm')]: {
                width: "3.5rem"
            },
        }}>
            <Tabs
                orientation="vertical"
                value={value}
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
                        minWidth: "auto",
                        '& .Mui-selected': {
                            fontWeight: theme.typography.fontWeightBold,
                        },
                    }
                }}
            >
                {weekDates.map((date, index) => (
                    <Tooltip
                        title={`${getActiveTasksForDate(date).length} tasks`}
                        placement="left"
                        key={index}
                        aria-label={`${tasks.length} tasks`}
                    >
                        <Tab
                            onClick={handleClickTab}
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
                    </Tooltip>
                ))}
            </Tabs>
        </Box>
    );
}