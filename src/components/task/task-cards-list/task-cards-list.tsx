import React, {useMemo} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTasks} from "../task-slice";
import {TaskCard} from "./task-card/task-card";
import {selectRightSection} from "../../../features/main/right-section/right-section-slice";
import dayjs from "dayjs";
import dogSwimming from "../../../assets/dog-swimming.svg"
import {useTheme} from "@mui/material";
import {TaskCardEdit} from "./task-card-edit/task-card-edit";
import {sortTasksByPriority} from "../../../utils/sortTasksByPriority";
import {
    selectTodoistLoading,
    selectTodoistTasks,
} from "../../../api/todoist-api";
import {Loading} from "../../generic/loading";
import {selectToken} from "../../../pages/login/login-slice";

export const TaskCardsList = () => {
    const theme = useTheme();

    const {tasks, editingTaskId} = useAppSelector(selectTasks);
    const {selectedDate} = useAppSelector(selectRightSection);
    const tasksAPI = useAppSelector(selectTodoistTasks);
    const token = useAppSelector(selectToken)
    const loading = useAppSelector(selectTodoistLoading);

    const hasTaskOnSelectedDate = useMemo(() => {
        if (token) {
            return tasksAPI.some((task) => {
                if (task.scheduledDate) {
                    return (task.scheduledDate === selectedDate) && !task.completed;
                }
                return false;
            });
        } else {
            return tasks.some((task) => (task.scheduledDate === selectedDate) && !task.completed);
        }
    }, [tasks, tasksAPI, selectedDate, token]);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0",
                height: "100%"
            }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "large"
                        }
                }}
                >
                    Tasks for {`${dayjs(selectedDate).format("ddd, DD MMM YYYY")}`}
                </Typography>

                {hasTaskOnSelectedDate ? (
                    sortTasksByPriority(token ? tasksAPI : tasks).filter((t) => !t.completed).map((task) => {
                        if (task.scheduledDate === selectedDate) {
                            return (
                                <Box key={task.id}>
                                    {editingTaskId === task.id ? (
                                        <TaskCardEdit
                                            selectedTask={task}
                                        />
                                    ) : (
                                        <TaskCard
                                            task={task}
                                        />
                                    )}
                                </Box>
                            )
                        }
                    })
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Box
                            component="img"
                            src={dogSwimming}
                            maxWidth="20rem"
                            alt="cards-image-dog"
                            sx={{
                                [theme.breakpoints.down('md')]: {
                                    width: "17rem"
                                },
                                [theme.breakpoints.down('sm')]: {
                                    width: "15rem"
                                },
                            }}
                        />
                        <Typography variant="subtitle1" sx={{
                            color: theme.palette.text.primary,
                            textAlign: 'center',
                            '& span': {
                                display: 'block'
                            },
                            '& span:first-of-type': {
                                fontWeight: 'bold',
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "0.9rem"
                            }
                        }} gutterBottom>
                            <span>It looks like you have no scheduled tasks for today</span>
                            <span>Well, a great reason to do something you really like or start a new business!</span>
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    )
}