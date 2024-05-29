import React, {useCallback} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import {TaskCard} from "../task-cards-list/task-card/task-card";
import {TaskStepper} from "../task-stepper/task-stepper";
import {TaskNameTextField} from "../task-name-text-field/task-name-text-field";
import {TaskButton} from "../task-button/task-button";
import DialogContent from "@mui/material/DialogContent";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTask, selectTasks, toggleTaskCreator} from "../task-slice";
import {useNavigate} from "react-router-dom";

export const TaskEditModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {name, description, isTaskCreatorOpen, tasks, selectedTask} = useAppSelector(selectTasks);

    const handleClose = useCallback(() => {
        dispatch(toggleTaskCreator(false));
        dispatch(selectTask(""));
        tasks.length ? navigate('/tasks') : navigate('/');
    }, [dispatch]);

    return (
        <Dialog
            open={isTaskCreatorOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="sm"
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                },
            }}
        >
            <DialogTitle>Task</DialogTitle>

            <DialogContent
                sx={{display: "flex", flexDirection: "row", gap: "5rem", padding: "0 3rem"}}
            >
                {selectedTask && <TaskCard task={selectedTask} />}
            </DialogContent>
        </Dialog>
    );
}