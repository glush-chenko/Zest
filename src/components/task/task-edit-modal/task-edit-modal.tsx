import React, {useCallback, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTask, selectTasks} from "../task-slice";
import {useNavigate, useParams} from "react-router-dom";
import {TaskCardEdit} from "../task-cards-list/task-card-edit/task-card-edit";
import {TaskCard} from "../task-cards-list/task-card/task-card";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material";

export const TaskEditModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { tasks, selectedTask, editingTaskId} = useAppSelector(selectTasks);
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
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: theme.palette.primary.main,
                    width: "100%",
                    height: "4rem",
                    color: theme.palette.primary.contrastText
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
                <TaskCardEdit selectedTask={selectedTask}/>
            </DialogContent>
        </Dialog>
    );
}