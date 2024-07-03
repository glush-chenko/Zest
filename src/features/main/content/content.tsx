import React, {useEffect} from "react";
import {useTheme} from "@mui/material";
import {OpenIconSpeedDial} from "../../../components/generic/open-icon-speed-dial";
import {useAppDispatch, useAppSelector, useSnackbarWithAction} from "../../../app/hooks";
import {selectTasks, setNewTaskId} from "../../../components/task/task-slice";
import Box from '@mui/material/Box';
import {TaskCardsList} from "../../../components/task/task-cards-list/task-cards-list";
import {Outlet, useNavigate} from "react-router-dom";

export const Content = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const {enqueueSnackbar, closeSnackbar} = useSnackbarWithAction();
    const navigate = useNavigate();
    const {newTaskId} = useAppSelector(selectTasks);

    useEffect(() => {
        if (newTaskId) {
            enqueueSnackbar("The task was successfully added", () => {
                closeSnackbar();
                navigate(`/tasks/${newTaskId}`);
                dispatch(setNewTaskId(null));
            }, "Edit",
                {
                onClose: () => {
                    dispatch(setNewTaskId(null));
                }
            });
        }
    }, [dispatch, newTaskId]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: theme.palette.background.default,
            flex: 1,
            padding: "1rem 4rem",
            [theme.breakpoints.down('sm')]: {
                padding: "0.5rem 1rem",
            },
        }}>
            <Outlet/>

            <Box sx={{
                width: "100%",
                height: "100%"
            }}>
                <TaskCardsList/>
            </Box>
        </Box>
    )
}