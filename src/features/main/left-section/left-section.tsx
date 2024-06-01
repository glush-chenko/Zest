import React, {useCallback, useMemo} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Drawer} from "../../../components/styled/drawer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDrawerOpen, toggleDrawer} from "./left-section-slice";
import Typography from '@mui/material/Typography';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import {useTheme} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {selectTasks} from "../../../components/task/task-slice";
import {LeftSectionListItem} from "./left-section-list-item/left-section-list-item";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import DoneIcon from '@mui/icons-material/Done';
import {NavLink} from "react-router-dom";

export const LeftSection = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const {tasks} = useAppSelector(selectTasks);
    const drawer = useAppSelector(selectDrawerOpen);

    const activeTasks = useMemo(() => {
        return tasks.filter((task) => !task.completed);
    }, [tasks]);

    const completedTasks = useMemo(() => {
        return tasks.filter((task) => task.completed);
    }, [tasks]);

    const handleDrawerOpen = useCallback(() => {
        dispatch(toggleDrawer(true));
    }, [toggleDrawer, dispatch]);

    const handleDrawerClose = useCallback(() => {
        dispatch(toggleDrawer(false));
    }, [toggleDrawer, dispatch]);

    return (
        <Drawer variant="permanent" open={drawer} anchor="left">
            <Toolbar/>
            <Box sx={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.light : theme.palette.grey[900],
                    color: theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white,
                    minHeight: "3.5rem",
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                }}>
                    {drawer && (
                        <Box sx={{display: "flex", flexGrow: 1, justifyContent: "center"}}>
                            <Typography variant="subtitle1">All Tasks</Typography>
                        </Box>
                    )}
                    <IconButton onClick={drawer ? handleDrawerClose : handleDrawerOpen} color="inherit">
                        {drawer ? <ChevronLeftIcon sx={{fontSize: "1.3rem"}}/> :
                            <ChevronRightIcon sx={{fontSize: "1.3rem"}}/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{overflow: "auto"}}>
                    <List>
                        {drawer && <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                color: theme.palette.warning.main,
                                display: "flex",
                                gap: "0.5rem",
                                padding: '0.5rem 1rem',
                                margin: 0,
                                fontSize: "1rem"
                            }}>
                            <AutorenewOutlinedIcon/>
                            In progress:
                        </Typography>}

                        {!activeTasks.length && (
                            <Box sx={{paddingLeft: "1.5rem"}}>
                                <Typography variant="body1">{drawer && "No active tasks"}</Typography>
                            </Box>
                        )}
                        {activeTasks.map((task) => (
                            <NavLink
                                to={`/tasks/${task.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                                key={task.id}
                            >
                                <LeftSectionListItem task={task} key={task.id} icon={CircleOutlinedIcon}/>
                            </NavLink>
                        ))}
                    </List>

                    {(drawer || activeTasks.length > 0) && <Divider/>}

                    <List>
                        {drawer && <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                color: theme.palette.success.light,
                                display: "flex",
                                gap: "0.5rem",
                                padding: '0.5rem 1rem',
                                margin: 0,
                                fontSize: "1rem"
                            }}>
                            <PublishedWithChangesOutlinedIcon/>
                            Completed:
                        </Typography>}

                        {!completedTasks.length && (
                            <Box sx={{paddingLeft: "1.5rem"}}>
                                <Typography variant="body1">{drawer && "No completed tasks"}</Typography>
                            </Box>
                        )}
                        {completedTasks.map((task) => (
                            <NavLink
                                to={`/tasks/${task.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                                key={task.id}
                            >
                                <LeftSectionListItem task={task} icon={DoneIcon}/>
                            </NavLink>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
}