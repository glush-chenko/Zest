import React from "react";
import Astronaut from "../../../assets/Astronaut-01.svg"
import {useTheme} from "@mui/material";
import {OpenIconSpeedDial} from "../../../components/generic/open-icon-speed-dial";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import { selectTasks} from "../../../components/task/task-slice";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {TaskModal} from "../../../components/task/task-modal/task-modal";
import {TaskCardsList} from "../../../components/task/task-cards-list/task-cards-list";
import {useLocation} from "react-router-dom";
import {TaskEditModal} from "../../../components/task/task-edit-modal/task-edit-modal";
import {selectHeader} from "../../header/header-slice";
import {HeaderModalProfile} from "../../header/header-modal-profile/header-modal-profile";

export const Content = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const {open} = useAppSelector(selectHeader);
    // const dispatch = useAppDispatch();
    const location = useLocation();
    const {isTaskCreatorOpen, tasks, selectedTask} = useAppSelector(selectTasks);

    // useEffect(() => {
    //     const tasksFromStorage = localStorage.getItem('tasks');
    //     if (tasksFromStorage) {
    //         dispatch(filterTasksByDate(JSON.parse(tasksFromStorage)));
    //     }
    // }, [dispatch]);
    //
    // useEffect(() => {
    //     dispatch(filterTasksByDate(dayjs().toString()));
    // }, [dispatch]);
    //
    // console.log(filteredTasksByDate)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:  location.pathname === "/tasks" ? 'flex-start' : "center",
            justifyContent:  location.pathname === "/tasks" ? 'flex-start' : "center",
            backgroundColor: theme.palette.background.default,
            flex: 1,
            padding: "1rem 4rem",
        }}>
            {open && <HeaderModalProfile />}
            {isTaskCreatorOpen && <TaskModal/>}
            {selectedTask && <TaskEditModal />}

            {tasks.length && location.pathname === "/tasks" ? (
                <Box sx={{
                    width: "100%",
                }}>
                    <TaskCardsList />
                    {/*<OpenIconSpeedDial/>*/}
                </Box>
            ) : (
                <>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%"
                    }}>
                        <Box component="img" src={Astronaut} maxWidth="18rem" marginBottom="1.5rem"
                             alt="content-image-astronaut"/>
                        <Typography variant="subtitle1" sx={{
                            color: theme.palette.text.primary,
                            textAlign: 'center',
                            '& span': {
                                display: 'block'
                            },
                            '& span:first-of-type': {
                                fontWeight: 'bold',
                            }
                        }} gutterBottom>
                            <span>What will you do today? </span>
                            <span>Every day is an opportunity to move forward.</span>
                            {/*Select a few important tasks, add them to the list and get satisfaction from completing them. */}
                            <span>Plan, relax, celebrate your successes. This will help you achieve your goals. </span>
                        </Typography>
                    </Box>
                    <OpenIconSpeedDial/>
                </>
            )}
        </Box>
    )
}