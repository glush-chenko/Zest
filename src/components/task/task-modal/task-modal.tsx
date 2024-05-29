import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTasks, toggleTaskCreator, selectTask} from "../task-slice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TaskNameTextField} from "../task-name-text-field/task-name-text-field";
import {TaskButton} from "../task-button/task-button";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Task} from "../task";
import {TaskStepper} from "../task-stepper/task-stepper";
import {TaskCard} from "../task-cards-list/task-card/task-card";

export const TaskModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {taskId} = useParams<{ taskId?: string }>();
    const {name, description, isTaskCreatorOpen, tasks, selectedTask} = useAppSelector(selectTasks);
    // const [selected, setSelected] = React.useState(false);

    // useEffect(() => {
    //     if (selectedTask) {
    //         setSelected(true)
    //         // dispatch(toggleTaskCreator(true));
    //     }
    // }, [selectedTask]);

    const handleClose = useCallback(() => {
        // dispatch(toggleTaskCreator(false));
        // dispatch(openSelectTask(false));
        dispatch(selectTask(null));
        // setSelected(false);
        // tasks.length ? navigate('/tasks') : navigate('/');
    }, [dispatch]);

    return (
        <Dialog
            open={isTaskCreatorOpen || location.pathname === "/add-task" || !!selectedTask}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='md'
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                },
            }}
        >
            <DialogTitle>Create Task</DialogTitle>

            <DialogContent
                sx={{display: "flex", flexDirection: "row", gap: "5rem", padding: "0 3rem"}}
            >
                <TaskStepper/>
                <TaskNameTextField/>
                {/*<TaskButton/>*/}
            </DialogContent>

            <DialogActions>
                <TaskButton/>
            </DialogActions>
        </Dialog>
    );
}