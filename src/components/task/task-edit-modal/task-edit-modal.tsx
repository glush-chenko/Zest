import React, {useCallback, useEffect, useMemo} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTask, selectTasks, Task} from "../task-slice";
import {useNavigate, useParams} from "react-router-dom";
import {TaskCardEdit} from "../task-cards-list/task-card-edit/task-card-edit";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material";
import {
    getActivityTaskById, getCompletedTasks,
    selectTodoistCompletedTasks, selectTodoistLoading,
    selectTodoistSelectedActivityTask,
    selectTodoistTasks
} from "../../../api/todoist-api";
import {Loading} from "../../generic/loading";
import {token} from "../../../utils/auth";
import {SCREEN_NAMES, selectHeader, setActiveScreen} from "../../../features/header/header-slice";

export const TaskEditModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const {tasks, selectedTask} = useAppSelector(selectTasks);
    const tasksAPI = useAppSelector(selectTodoistTasks);
    const selectedActivityTask = useAppSelector(selectTodoistSelectedActivityTask);
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const loading = useAppSelector(selectTodoistLoading);
    const {currentScreenName} = useAppSelector(selectHeader);

    const [selectedCompletedTask, setSelectedCompletedTask] = React.useState<Task | null>(null);

    const {id} = useParams<{ id: string }>();

    // console.log(selectedActivityTask)

    const isCompleted = useMemo(() => {
        return completedTasksAPI.some(task => task.id === id);
    }, [completedTasksAPI])

    useEffect(() => {
        if (id) {
            if (token) {
                if (isCompleted) {
                    const foundCompletedTask = completedTasksAPI.find(task => task.id === id);
                    setSelectedCompletedTask(foundCompletedTask || null)
                } else {
                    dispatch(setActiveScreen(SCREEN_NAMES.TASK));
                }
            } else {
                dispatch(selectTask(id));
            }
        }
    }, [dispatch, id, isCompleted, completedTasksAPI, token, selectedActivityTask]);

    useEffect(() => {
        switch (currentScreenName) {
            case SCREEN_NAMES.TASK:
                dispatch(getActivityTaskById(id ? id : ""));
                break;
        }
    }, [currentScreenName]);

    const handleClose = useCallback(() => {
        dispatch(selectTask(""));
        if (token) {
            tasksAPI.length ? navigate('/tasks') : navigate('/');
        } else {
            tasks.length ? navigate('/tasks') : navigate('/');
        }
    }, [dispatch, tasks, tasksAPI, token]);

    if (loading) {
        return <Loading/>
    }

    return (
        <Dialog
            open={token ?
                isCompleted ? !!selectedCompletedTask : !!selectedActivityTask
                : !!selectedTask}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
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
                    },
                }}
            >
                Task edit
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                >
                    <CloseIcon sx={{fontSize: "1.3rem", color: `${theme.palette.primary.contrastText}`}}/>
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                }}
            >
                <TaskCardEdit selectedTask={token ?
                    isCompleted ? selectedCompletedTask : selectedActivityTask
                    : selectedTask}/>
            </DialogContent>
        </Dialog>
    );
}