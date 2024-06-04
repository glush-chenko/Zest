import React, {useCallback, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTask, selectTasks, setEditingTaskId} from "../task-slice";
import {useNavigate, useParams} from "react-router-dom";
import {TaskCardEdit} from "../task-cards-list/task-card-edit/task-card-edit";

export const TaskEditModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { tasks, selectedTask} = useAppSelector(selectTasks);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(selectTask(id));
        }
    }, [dispatch, id]);

    const handleClose = useCallback(() => {
        dispatch(selectTask(""));
        tasks.length ? navigate('/tasks') : navigate('/');
    }, [dispatch]);

    return (
        <Dialog
            open={!!selectedTask}
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

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5rem",
                    justifyContent: "center",
            }}
            >
                <TaskCardEdit selectedTask={selectedTask}/>
            </DialogContent>
        </Dialog>
    );
}