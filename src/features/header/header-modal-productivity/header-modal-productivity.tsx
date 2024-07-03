import React, {useCallback, useEffect, useMemo} from "react";
import Dialog from "@mui/material/Dialog";
import {useTheme} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from '@mui/material/Stack';
import {BarChart, BarChartProps} from '@mui/x-charts/BarChart';
import {PieChart, PieChartProps} from '@mui/x-charts/PieChart';
import {useAppSelector} from "../../../app/hooks";
import {selectTasks, Task} from "../../../components/task/task-slice";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {selectRightSection} from "../../main/right-section/right-section-slice";
import Button from "@mui/material/Button";
import {HeaderModalGoal} from "../header-modal-goal/header-modal-goal";
import {selectHeader} from "../header-slice";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {completedTasksForPrevious} from "../../../utils/completed-tasks-for-previous";
import {useLocation, useNavigate} from "react-router-dom";
import {HeaderModalSectionProductivity} from "./header-modal-section-productivity/header-modal-section-productivity";
import {groupDaysIntoMonths} from "../../../utils/group-days-into-months";
import {getXAxisLabels} from "../../../utils/get-xaxis-labels";
import {getCompletedTasksCount} from "../../../utils/get-completed-tasks-count";
import {ActivitySorting} from "../../../pages/activity/activity-sorting/activity-sorting";
import {selectTodoistCompletedTasks, selectTodoistTasks} from "../../../api/todoist-api";
import {selectScreenSizes} from "../../screen-slice";
import {selectToken} from "../../../pages/login/login-slice";

const PERIODS = [
    {
        period: "week",
        text: "this week",
    },
    {
        period: "month",
        text: "this month",
    },
    {
        period: "year",
        text: "this year",
    },
];

export const HeaderModalProductivity = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [tasksData, setTasksData] = React.useState<Task[]>([]);
    const activeTasksAPI = useAppSelector(selectTodoistTasks);
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const {selectedDate} = useAppSelector(selectRightSection);
    const {goalForDay} = useAppSelector(selectHeader);
    const {tasks} = useAppSelector(selectTasks);
    const screenSizes = useAppSelector(selectScreenSizes);
    const token = useAppSelector(selectToken)

    const [openEditGoal, setOpenEditGoal] = React.useState(false);
    const [selectedText, setSelectedText] = React.useState(PERIODS[0].text);
    const [selectedPeriod, setSelectedPeriod] = React.useState('week');

    useEffect(() => {
        let tasksData;
        if (token) {
            tasksData = [...activeTasksAPI, ...completedTasksAPI];
        } else {
            tasksData = tasks;
        }
        setTasksData(tasksData);
    }, [activeTasksAPI, completedTasksAPI, token, tasks]);

    const [weekData, setWeekData] = React.useState<{ current: number[]; previous: number[] }>({
        current: [],
        previous: [],
    });
    const [monthData, setMonthData] = React.useState<{ current: number[]; previous: number[] }>({
        current: [],
        previous: [],
    });
    const [yearData, setYearData] = React.useState<{ current: number[]; previous: number[] }>({
        current: [],
        previous: [],
    });

    const completedTasksForWeek = completedTasksForPrevious({tasks: tasksData, period: "week", current: true})
    const completedTasksForPreviousWeek = completedTasksForPrevious({tasks: tasksData, period: "week", current: false})

    const completedTasksForMonth = completedTasksForPrevious({tasks: tasksData, period: "month", current: true});
    const completedTasksForPreviousMonth = completedTasksForPrevious({
        tasks: tasksData,
        period: "month",
        current: false
    });

    const completedTasksForYear = completedTasksForPrevious({tasks: tasksData, period: "year", current: true});
    const completedTasksForPreviousYear = completedTasksForPrevious({tasks: tasksData, period: "year", current: false});

    const completedTasksForYearIntoMonth = groupDaysIntoMonths(completedTasksForYear);
    const completedTasksForPreviousYearIntoMonth = groupDaysIntoMonths(completedTasksForPreviousYear);

    const xAxisLabels = getXAxisLabels(selectedPeriod, dayjs());

    const weeklyCompletedTasks = getCompletedTasksCount(tasksData, 'week', true, false);
    const monthlyCompletedTasks = getCompletedTasksCount(tasksData, 'month', true, false);
    const yearlyCompletedTasks = getCompletedTasksCount(tasksData, 'year', true, false);

    const totalWeeklyCompletedTasks = getCompletedTasksCount(tasksData, 'week', true, true);
    const totalMonthlyCompletedTasks = getCompletedTasksCount(tasksData, 'month', true, true);
    const totalYearlyCompletedTasks = getCompletedTasksCount(tasksData, 'year', true, true);

    const weeklyCompletedTasksPrevious = getCompletedTasksCount(tasksData, 'week', false, false);
    const monthlyCompletedTasksPrevious = getCompletedTasksCount(tasksData, 'month', false, false);
    const yearlyCompletedTasksPrevious = getCompletedTasksCount(tasksData, 'year', false, false);

    const totalWeeklyCompletedTasksPrevious = getCompletedTasksCount(tasksData, 'week', false, true);
    const totalMonthlyCompletedTasksPrevious = getCompletedTasksCount(tasksData, 'month', false, true);
    const totalYearlyCompletedTasksPrevious = getCompletedTasksCount(tasksData, 'year', false, true);

    let maxCompletedTasks = useMemo(() => {
        switch (selectedPeriod) {
            case 'week':
                return Math.max(weeklyCompletedTasks, weeklyCompletedTasksPrevious);
            case 'month':
                return Math.max(monthlyCompletedTasks, monthlyCompletedTasksPrevious);
            case 'year':
                return Math.max(yearlyCompletedTasks, yearlyCompletedTasksPrevious);
        }
        return 0;
    }, [
        selectedPeriod,
        weeklyCompletedTasks,
        weeklyCompletedTasks,
        monthlyCompletedTasks,
        monthlyCompletedTasksPrevious,
        yearlyCompletedTasks,
        yearlyCompletedTasksPrevious
    ]);

    let totalMaxCompletedTasks = useMemo(() => {
        switch (selectedPeriod) {
            case 'week':
                return Math.max(totalWeeklyCompletedTasks, totalWeeklyCompletedTasksPrevious);
            case 'month':
                return Math.max(totalMonthlyCompletedTasks, totalMonthlyCompletedTasksPrevious);
            case 'year':
                return Math.max(totalYearlyCompletedTasks, totalYearlyCompletedTasksPrevious);
        }
        return 0;
    }, [
        selectedPeriod,
        totalWeeklyCompletedTasks,
        totalWeeklyCompletedTasksPrevious,
        totalMonthlyCompletedTasks,
        totalMonthlyCompletedTasksPrevious,
        totalYearlyCompletedTasks,
        totalYearlyCompletedTasksPrevious
    ]);

    useEffect(() => {
        if (PERIODS[0].text === selectedText) {
            setWeekData({
                current: completedTasksForWeek.map(item => item.completedTasksCount),
                previous: completedTasksForPreviousWeek.map(item => item.completedTasksCount),
            });
            setSelectedPeriod(PERIODS[0].period);
        } else if (PERIODS[1].text === selectedText) {
            setMonthData({
                current: completedTasksForMonth.map(item => item.completedTasksCount),
                previous: completedTasksForPreviousMonth.map(item => item.completedTasksCount),
            });
            setSelectedPeriod(PERIODS[1].period);
        } else {
            setYearData({
                current: completedTasksForYearIntoMonth.map(item => item.completedTasksCount),
                previous: completedTasksForPreviousYearIntoMonth.map(item => item.completedTasksCount),
            });
            setSelectedPeriod(PERIODS[2].period);
        }

    }, [
        selectedText,
        tasksData
    ]);

    const getPieChartData = useMemo(() => {
        const completedTasks = tasksData.filter((t) => t.completed).length;
        const inProgressTasks = tasksData.filter((t) => !t.completed).length;
        const overdueTasksCount = tasksData.filter((t) => !t.completed && dayjs().diff(dayjs(t.scheduledDate), 'day') > 7).length;

        const totalTasks = completedTasks + inProgressTasks + overdueTasksCount;

        const completedPercentage = Math.round((completedTasks / totalTasks) * 100);
        const inProgressPercentage = Math.round((inProgressTasks / totalTasks) * 100);
        const overduePercentage = Math.round((overdueTasksCount / totalTasks) * 100);

        return [
            {
                value: completedTasks,
                label: 'Completed',
                id: `Completed ${completedPercentage}`,
                key: `${completedPercentage}`
            },
            {
                value: inProgressTasks,
                label: 'In Progress',
                id: `In Progress ${inProgressPercentage}`,
                key: `${inProgressPercentage}`
            },
            {
                value: overdueTasksCount,
                label: 'Overdue',
                id: `Overdue ${overduePercentage}`,
                key: `${overduePercentage}`
            },
        ]
    }, [tasksData]);

    const completedTasksForDay = useMemo(() => {
        return tasksData.filter((task) =>
            dayjs(task.completedAt).isSame(selectedDate, 'day') && task.completed
        ).length
    }, [tasksData, selectedDate]);

    const handleClickButtonGoal = useCallback(() => {
        setOpenEditGoal(true);
    }, []);

    const handleCloseGoal = useCallback(() => {
        setOpenEditGoal(false);
    }, []);

    const handleClose = useCallback(() => {
        navigate(location.state?.previousRoute || "/");
    }, [navigate]);

    const barChartsProps: BarChartProps = {
        series: [
            {
                data: selectedText === PERIODS[0].text ?
                    weekData.previous :
                    selectedText === PERIODS[1].text ?
                        monthData.previous :
                        yearData.previous,
                label: "previous",
                highlightScope: {highlighted: 'item', faded: 'global'},
            },
            {
                data: selectedText === PERIODS[0].text ?
                    weekData.current :
                    selectedText === PERIODS[1].text ?
                        monthData.current :
                        yearData.current,
                label: "task",
                highlightScope: {highlighted: 'item', faded: 'global'},
            }
        ],
        xAxis: [{
            scaleType: 'band',
            data: xAxisLabels,
        }],
        yAxis: [{
            label: `goal for ${selectedPeriod}`,
            scaleType: 'linear',
            max: selectedText === PERIODS[2].text ?
                maxCompletedTasks :
                totalMaxCompletedTasks,
            min: 0,
            tickMinStep: 1,
        }],
        height: screenSizes.isSmall ? 270 : 350,
        slotProps: {
            legend: {
                hidden: false,
            },
        },
        grid: {horizontal: true},
        // layout: "horizontal",
    };

    const pieChartProps: PieChartProps = {
        series: [
            {
                innerRadius: 100,
                outerRadius: 120,
                cornerRadius: 14,
                paddingAngle: 3,
                cx: "70%",
                data: getPieChartData,
                highlightScope: {highlighted: 'item', faded: 'global'},
            },
        ],
        height: screenSizes.isSmall ? 250 : 300,
        slotProps: {
            legend: {
                hidden: true,
            },
        },
    };

    return (
        <>
            <Dialog
                open
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: "1rem",
                        borderRadius: "1rem",
                        paddingBottom: "1rem",
                        backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[900],
                        [theme.breakpoints.down('md')]: {
                            maxWidth: "40rem"
                        }
                    },
                }}
                sx={{
                    '& ::-webkit-scrollbar': {
                        width: '0.6rem',
                    },
                    '& ::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.grey[500],
                        borderRadius: '4px',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: theme.palette.primary.main,
                        width: "100%",
                        height: "4rem",
                        color: theme.palette.primary.contrastText,
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "large",
                            maxHeight: "3rem",
                            padding: "0.5rem 1rem"
                        }
                    }}
                >
                    Productivity
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{fontSize: "1.3rem", color: `${theme.palette.primary.contrastText}`}}/>
                    </IconButton>
                </DialogTitle>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[600],
                    borderRadius: "1rem",
                    padding: "1rem 2rem 1rem 2rem",
                    [theme.breakpoints.down('sm')]: {
                        padding: "0.5rem 1rem"
                    }
                }}>
                    <Typography variant="body1" sx={{fontWeight: 600}}>Goal for the day</Typography>
                    <Box sx={{border: `1px solid ${theme.palette.grey[300]}`, width: "100%"}}/>

                    <Typography variant="body1">
                        {tasksData.filter((t) => t.completed).length} tasks completed.
                    </Typography>

                    <WorkspacePremiumIcon
                        sx={{
                            fontSize: '4rem',
                            color: theme.palette.mode === "light" ? theme.palette.grey[600] : theme.palette.common.white,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "3rem"
                            }
                        }}
                    />

                    <Typography variant="body2">
                        The goal for the day has been achieved: {completedTasksForDay}/{goalForDay} tasks
                    </Typography>

                    <Button
                        sx={{
                            fontSize: "0.8rem"
                        }}
                        onClick={handleClickButtonGoal}
                        variant="contained"
                        aria-label="Change goal for the day"
                    >
                        Change goal
                    </Button>
                </Box>

                <Stack
                    direction={{md: 'row', sm: 'column'}}
                    spacing={1}
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        width: '100%',
                        padding: "1rem",
                        [theme.breakpoints.down('md')]: {
                            maxHeight: "25rem",
                            padding: "0 4rem"
                        },
                        [theme.breakpoints.down('sm')]: {
                            // maxHeight: "25rem",
                            padding: "0.5rem"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            // alignItems: "center",
                            gap: "0.5rem",
                            width: "100%",
                            backgroundColor: theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[600],
                            // color: theme.palette.common.black,
                            borderRadius: "2rem",
                            padding: "1rem",
                            flex: 2,
                            [theme.breakpoints.down('md')]: {
                                maxWidth: "30rem",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" sx={{fontWeight: 600}}>
                                Last activity
                                {/*of the {`${selectedPeriod}`}*/}
                            </Typography>
                            <ActivitySorting
                                periods={PERIODS}
                                selectedText={selectedText}
                                onTextChange={setSelectedText}
                            />
                        </Box>

                        <Box sx={{border: `1px solid ${theme.palette.grey[300]}`, width: "100%"}}/>
                        <BarChart
                            {...barChartsProps}
                            colors={[`${theme.palette.primary.light}`, `${theme.palette.violet.main}`]}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            // alignItems: "center",
                            gap: "0.5rem",
                            width: "100%",
                            backgroundColor: theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[600],
                            borderRadius: "2rem",
                            padding: "1rem",
                            flex: 1,
                            minWidth: "20rem",
                            [theme.breakpoints.down('md')]: {
                                maxWidth: "30rem",
                            },
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: 600}}>Current task status</Typography>
                        <Box sx={{border: `1px solid ${theme.palette.grey[300]}`, width: "100%"}}/>
                        <PieChart
                            {...pieChartProps}
                            colors={[`${theme.palette.violet.main}`, `${theme.palette.primary.light}`, `${theme.palette.primary.dark}`]}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center"
                            }}
                        >
                            <HeaderModalSectionProductivity
                                text="in progress"
                                chartData={getPieChartData[1].key}
                                hintText="Tasks that are currently being worked on."
                            />

                            <HeaderModalSectionProductivity
                                text="overdue"
                                chartData={getPieChartData[2].key}
                                hintText="Tasks that have been in progress for more than 7 days are considered overdue."
                            />

                            <HeaderModalSectionProductivity
                                text="completed"
                                chartData={getPieChartData[0].key}
                                hintText="Tasks that have been successfully completed."
                            />
                        </Box>
                    </Box>
                </Stack>
            </Dialog>

            {openEditGoal && (
                <HeaderModalGoal
                    text="Tasks for the day"
                    onClose={handleCloseGoal}
                />
            )}
        </>
    );
}