import React, {useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../app/hooks";
import {selectTasks} from "../../components/task/task-slice";
import Typography from "@mui/material/Typography";
import {TaskCard} from "../../components/task/task-cards-list/task-card/task-card";
import dayjs from "dayjs";
import errorRocket from "../../assets/error-rocket-destroyed.svg";
import {useTheme} from "@mui/material";
import {selectTodoistCompletedTasks, selectTodoistTasks} from "../../api/todoist-api";
import {selectToken} from "../login/login-slice";
import {TaskCardEdit} from "../../components/task/task-cards-list/task-card-edit/task-card-edit";

export const SearchPage = () => {
    const {tasks} = useAppSelector(selectTasks);
    const activeTasksAPI = useAppSelector(selectTodoistTasks);
    const token = useAppSelector(selectToken)
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const {editingTaskId} = useAppSelector(selectTasks);
    const tasksAPI = [...activeTasksAPI, ...completedTasksAPI];

    const theme = useTheme();
    const [searchParams] = useSearchParams()

    const taskNameToFind = searchParams.get("name");
    const taskIdToFind = searchParams.get("id");

    const filteredTasks = useMemo(() => {
        if (token) {
            return tasksAPI.filter(task => {
                return taskIdToFind ?
                    task.id === taskIdToFind :
                    task.name.toLowerCase().includes(taskNameToFind?.toLowerCase() || '')
            })
        } else {
            return tasks.filter(task => {
                return taskIdToFind ?
                    task.id === taskIdToFind :
                    task.name.toLowerCase().includes(taskNameToFind?.toLowerCase() || '')
            })
        }
    }, [tasks, taskIdToFind, taskNameToFind, tasksAPI]);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                padding: "2rem 4rem",
                [theme.breakpoints.down('sm')]: {
                    padding: "2rem"
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    height: "100%",
                }}
            >
                {filteredTasks.length ? (
                    filteredTasks.map(task => (
                        <Box key={task.id}>
                            <Typography variant="h6" gutterBottom sx={{
                                fontWeight: "bold",
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: "large"
                                }
                            }}>
                                Tasks for {`${dayjs(task.scheduledDate ? task.scheduledDate : task.createdAt).format("ddd, DD MMM YYYY")}`}
                            </Typography>

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
                    ))
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: "0.5rem",
                            height: "100%",
                        }}
                    >
                        <Box
                            component="img"
                            src={errorRocket}
                            maxWidth="20rem"
                            alt="cards-image-dog"
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: theme.palette.text.primary,
                                textAlign: 'center',
                                '& span': {
                                    display: 'block'
                                },
                                '& span:first-of-type': {
                                    fontWeight: 'bold',
                                },
                                overflow: "hidden"
                            }}
                            gutterBottom
                        >
                            <span>Sorry, nothing was found for your "{taskNameToFind}" query</span>
                            <span>Check if the request was written correctly. You may have made a typo or a mistake in the wording.</span>
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}