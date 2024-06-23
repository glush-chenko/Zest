import React, {useEffect, useMemo} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import Divider from '@mui/material/Divider';
import {selectTasks, Task} from "../../components/task/task-slice";
import {ActivityListItem} from "./activity-list-item/activity-list-item";
import {formatDate} from "../../utils/format-date";
import {Sorting} from "../../components/generic/sorting";
import {useLocation} from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import {PRIORITY} from "../../components/task/task-cards-list/task-card-edit/task-card-edit";

const STATUS_TASK = [
    {
        text: 'all'
    },
    {
        text: 'doing'
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
    const {tasks} = useAppSelector(selectTasks);
    const boxRef = React.useRef<HTMLDivElement>(null);
    const [valueSelectStatusTask, setValueSelectStatusTask] = React.useState(STATUS_TASK[0].text);
    const [valueSortedTask, setValueSortedTask] = React.useState(SORTED_TASK[0].text);
    const activityTaskLocation = /^\/activity\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(location.pathname);

    useEffect(() => {
        if (valueSelectStatusTask === "doing" && activityTaskLocation) {
            setValueSelectStatusTask("all");
        }
    }, [valueSelectStatusTask, activityTaskLocation]);

    const groupAndSortTasks = useMemo(() => {
        const priorityMap: { [key: string]: number } = PRIORITY.reduce((map, priority) => {
            map[priority.value] = PRIORITY.indexOf(priority) + 1;
            return map;
        }, {} as { [key: string]: number });

        const sortByPriority = (tasks: Task[]) =>
            [...tasks].sort((a, b) => {
                const priorityDiff = priorityMap[a.priority] - priorityMap[b.priority];
                if (priorityDiff !== 0) {
                    return priorityDiff;
                }
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
            });

        const sortByDate = (tasks: Task[]) =>
            [...tasks].sort((a, b) => {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
            });

        if (valueSortedTask === 'priority') {
            if (valueSelectStatusTask === 'all') {
                return sortByPriority(tasks).reduce((groups, task) => {
                    const date = formatDate(task.createdAt);
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(task);
                    return groups;
                }, {} as { [key: string]: Task[] });
            } else {
                const filteredTasks = valueSelectStatusTask === 'doing'
                    ? tasks.filter(task => !task.completed)
                    : tasks.filter(task => task.completed);

                return sortByPriority(filteredTasks).reduce((groups, task) => {
                    const date = formatDate(task.createdAt);
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(task);
                    return groups;
                }, {} as { [key: string]: Task[] });
            }
        } else {
            if (valueSelectStatusTask === 'all') {
                return sortByDate(tasks).reduce((groups, task) => {
                    const date = formatDate(task.createdAt);
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(task);
                    return groups;
                }, {} as { [key: string]: Task[] });
            } else {
                const filteredTasks = valueSelectStatusTask === 'doing'
                    ? tasks.filter(task => !task.completed)
                    : tasks.filter(task => task.completed);

                return sortByDate(filteredTasks).reduce((groups, task) => {
                    const date = formatDate(task.createdAt);
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(task);
                    return groups;
                }, {} as { [key: string]: Task[] });
            }
        }
    }, [tasks, valueSelectStatusTask, formatDate, PRIORITY, valueSortedTask])

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
                overflow: "auto",
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
                        <Sorting periods={SORTED_TASK} selectedText={valueSortedTask}
                                 onTextChange={setValueSortedTask}/>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <FilterListIcon/>
                        <Sorting periods={STATUS_TASK} selectedText={valueSelectStatusTask}
                                 onTextChange={setValueSelectStatusTask}/>
                    </Box>
                </Box>

                {Object.entries(groupAndSortTasks).length === 0 ? (
                    <Typography variant="body1">
                        No tasks yet. Add a new task to get started.
                    </Typography>
                ) : (
                    Object.entries(groupAndSortTasks).map(([date, tasks]) => (
                        <Box
                            key={date}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem"
                            }}
                        >
                            <Typography variant="body1" sx={{fontWeight: 600}}>{date}</Typography>
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
                                        prioritySort={valueSortedTask === "priority"}
                                    />
                                    <Divider/>
                                </Box>
                            ))}
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    )
}