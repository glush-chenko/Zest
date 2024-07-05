import React, {useCallback, useEffect} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Drawer} from "../../../components/styled/drawer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDrawerOpen, toggleDrawer} from "./left-section-slice";
import Typography from '@mui/material/Typography';
import {useTheme} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {selectActiveTasks, selectCompletedTasks} from "../../../components/task/task-slice";
import {TasksSection} from "./tasks-section/tasks-section";
import {selectTodoistCompletedTasks, selectTodoistTasks} from "../../../api/todoist-api";
import {selectScreenSizes} from "../../screen-slice";
import {selectToken} from "../../../pages/login/login-slice";

interface LeftSectionProps {
    isLoggedIn: boolean
}

export const LeftSection = (props: LeftSectionProps) => {
    const {isLoggedIn} = props;
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const activeTasks = useAppSelector(selectActiveTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);
    const drawer = useAppSelector(selectDrawerOpen);
    const activeTasksAPI = useAppSelector(selectTodoistTasks);
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const screenSizes = useAppSelector(selectScreenSizes);
    const token = useAppSelector(selectToken)

    useEffect(() => {
        if (screenSizes.isMedium) {
            dispatch(toggleDrawer(false));
        } else {
            dispatch(toggleDrawer(true));
        }
    }, [dispatch, toggleDrawer, screenSizes]);

    const handleDrawerOpen = useCallback(() => {
        dispatch(toggleDrawer(true));
    }, [toggleDrawer, dispatch]);

    const handleDrawerClose = useCallback(() => {
        dispatch(toggleDrawer(false));
    }, [toggleDrawer, dispatch]);

    return (
        !screenSizes.isSmall ? (
            <Drawer
                variant="permanent"
                open={drawer}
                anchor="left"
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        border: "none"
                    },
                }}
            >
                <Toolbar/>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.grey[900],
                            color: theme.palette.common.white,
                            minHeight: "3.5rem",
                            padding: theme.spacing(0, 1),
                            ...theme.mixins.toolbar,
                        }}
                    >
                        {drawer && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexGrow: 1,
                                    justifyContent: "center"
                                }}
                            >
                                <Typography variant="subtitle1">All Tasks</Typography>
                            </Box>
                        )}
                        <IconButton
                            onClick={drawer ? handleDrawerClose : handleDrawerOpen}
                            color="inherit"
                            aria-label="button chevron"
                        >
                            {drawer ? (
                                <ChevronLeftIcon sx={{fontSize: "1.3rem"}}/>
                            ) : (
                                <ChevronRightIcon sx={{fontSize: "1.3rem"}}/>
                            )}
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        <TasksSection
                            active={true}
                            tasks={token ? activeTasksAPI : activeTasks}
                            isLoggedIn={isLoggedIn}
                        />
                        {(drawer || activeTasksAPI.length > 0) && <Divider/>}
                        <TasksSection
                            active={false}
                            tasks={token ? completedTasksAPI : completedTasks}
                            isLoggedIn={isLoggedIn}
                        />
                    </Box>
                </Box>
            </Drawer>
        ) : null
    );
}