import React, {Fragment, useCallback, useEffect, useMemo} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import Divider from '@mui/material/Divider';
import {selectActiveTasks, selectCompletedTasks, selectTasks, Task} from "../../components/task/task-slice";
import {ActivityListItem} from "./activity-list-item/activity-list-item";
import {formatDate} from "../../utils/format-date";
import {useLocation} from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import {PRIORITY} from "../../components/task/task-cards-list/task-card-edit/task-card-edit";
import {ActivitySorting} from "./activity-sorting/activity-sorting";
import {selectTodoistCompletedTasks, selectTodoistTasks} from "../../api/todoist-api";
import {selectToken} from "../login/login-slice";

const STATUS_TASK = [
    {
        text: 'all'
    },
    {
        text: 'in progress'
    },
    {
        text: "completed"
    }
]

const SORTED_TASK = [
    {
        text: "date"
    },
    {
        text: "priority"
    }
]

export const ActivityPage = () => {
    const theme = useTheme();
    const location = useLocation();
    const boxRef = React.useRef<HTMLDivElement>(null);

    const {tasks} = useAppSelector(selectTasks);
    const activeTasksAPI = useAppSelector(selectTodoistTasks);
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const activeTasks = useAppSelector(selectActiveTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);
    const token = useAppSelector(selectToken)
    const tasksAPI = [...activeTasksAPI, ...completedTasksAPI];

    const [valueSelectStatusTask, setValueSelectStatusTask] = React.useState(STATUS_TASK[0].text);
    const [valueSortedTask, setValueSortedTask] = React.useState(SORTED_TASK[0].text);
    const activityTaskLocation = /^\/activity\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(location.pathname);

    useEffect(() => {
        if (valueSelectStatusTask === "in progress" && activityTaskLocation) {
            setValueSelectStatusTask("all");
        }
    }, [valueSelectStatusTask, activityTaskLocation]);

    const selectedTasks = useMemo(() => {
        switch (valueSelectStatusTask) {
            case "all":
                return token ? tasksAPI : tasks;
            case "in progress":
                return token ? activeTasksAPI : activeTasks;
            case "completed":
                return token ? completedTasksAPI : completedTasks;
        }
        return [];
    }, [tasks, activeTasksAPI, completedTasksAPI, valueSelectStatusTask, tasksAPI, activeTasks, completedTasks])

    const sortByDate = useCallback((tasks: Task[]) =>
        [...tasks].sort((a, b) => {

            if (a.createdAt !== null && b.createdAt !== null && a.createdAt < b.createdAt) return 1;
            if (a.createdAt !== null && b.createdAt !== null && a.createdAt > b.createdAt) return -1;
            return 0;
        }), [tasks]);

    const groupsByPriority = useMemo(() => {
        const groupByDate = (priority: string) => {
            return selectedTasks.filter(task => task.priority === priority)
                .reduce((dateGroups, task) => {
                    const date = formatDate(task.createdAt ? task.createdAt : null);
                    if (!dateGroups[date]) {
                        dateGroups[date] = [];
                    }
                    dateGroups[date].push(task);
                    return dateGroups;
                }, {} as { [key: string]: Task[] });
        }
        return PRIORITY.reduce((priorityGroups, priority) => {
            priorityGroups[priority.value] = groupByDate(priority.value);
            return priorityGroups;
        }, {} as { [key: string]: { [key: string]: Task[] } });

    }, [selectedTasks])

    const groupsByDate = useMemo(() => {
        return sortByDate(selectedTasks).reduce((groups, task) => {
            const date = formatDate(task.completedAt ? task.completedAt : task.createdAt);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(task);
            return groups;
        }, {} as { [key: string]: Task[] });
    }, [selectedTasks]);

    return (
        <Box
            ref={boxRef}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: theme.palette.background.default,
                flex: 1,
                padding: "1rem 5rem",
                [theme.breakpoints.up('lg')]: {
                    padding: "1rem 2rem",
                },
                [theme.breakpoints.down('sm')]: {
                    padding: "1rem",
                },
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                width: "100%",
                gap: "0.2rem"
            }}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <SortIcon/>
                        <ActivitySorting periods={SORTED_TASK} selectedText={valueSortedTask}
                                         onTextChange={setValueSortedTask}/>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <FilterListIcon/>
                        <ActivitySorting periods={STATUS_TASK} selectedText={valueSelectStatusTask}
                                         onTextChange={setValueSelectStatusTask}/>
                    </Box>
                </Box>

                {valueSortedTask === 'priority' && (
                    Object.entries(groupsByPriority).reverse().map(([priority, priorityTasks]) => (
                        Object.values(priorityTasks).length > 0 && (
                            <Box
                                key={priority}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}
                            >
                                {Object.entries(priorityTasks).map(([date, tasks]) => (
                                    <Fragment key={date}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600,
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: "0.9rem"
                                                }
                                            }}
                                        >
                                            {date}
                                        </Typography>
                                        <Divider/>

                                        {tasks.map((task) => (
                                            <Box
                                                key={task.id}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "0.5rem",
                                                }}
                                            >
                                                <ActivityListItem
                                                    completed={task.completed}
                                                    task={task}
                                                    boxRef={boxRef}
                                                    prioritySort
                                                />
                                                <Divider/>
                                            </Box>
                                        ))}
                                    </Fragment>
                                ))}
                            </Box>
                        )
                    ))
                )}

                {valueSortedTask === 'date' && (
                    Object.entries(groupsByDate).reverse().map(([date, dateTasks]) => (
                        Object.values(dateTasks).length > 0 && (
                            <Box
                                key={date}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}
                            >

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: "0.9rem"
                                        }
                                    }}
                                >
                                    {date}
                                </Typography>
                                <Divider/>

                                {Object.values(dateTasks).flat().map((task) => (
                                    <Box
                                        key={task.id}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <ActivityListItem
                                            completed={task.completed}
                                            task={task}
                                            boxRef={boxRef}
                                            prioritySort={false}
                                        />
                                        <Divider/>
                                    </Box>
                                ))}
                            </Box>
                        )
                    ))
                )}

            </Box>
        </Box>
    )
}