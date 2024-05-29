import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Drawer} from "../../../components/styled/drawer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDrawerOpen, toggleDrawer} from "./left-section-slice";
import Typography from '@mui/material/Typography';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {useTheme} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { selectTask, selectTasks} from "../../../components/task/task-slice";
import {TaskModal} from "../../../components/task/task-modal/task-modal";
import {LeftSectionListItem} from "./left-section-list-item/left-section-list-item";
import { v4 as uuidv4 } from 'uuid';

const PROGRESS = ["feed the cat", "vacuum the house under the sofas", "take out the trash", " listen to classical music", "watch new releases of your favorite show", "shop for home, go to an unknown place", "travel in nature, rollerblade and skate in the summer", "learn to dive and sew a cross", "look at the waterfall and take a picture with it"];
const COMPLETED = ["sleep with a toy by your side", "Sit and enjoy life in the rays of the spring sun", "Go and make a delicious breakfast, imagining that you are a great chef", "swim with your favorite toys in soap suds", "hug all your friends ten times", "invite everyone to eat a New Year's dish in the summer", "lalal", "l", "riu"];

export const LeftSection = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const {tasks, completedTasks, selectedTask} = useAppSelector(selectTasks);
    const drawer = useAppSelector(selectDrawerOpen);

    const handleDrawerOpen = useCallback(() => {
        dispatch(toggleDrawer(true));
    }, [toggleDrawer, dispatch]);

    const handleDrawerClose = useCallback(() => {
        dispatch(toggleDrawer(false));
    }, [toggleDrawer, dispatch]);

    // const handleTaskClick = useCallback((taskId: string) => {
    //     dispatch(selectTask(taskId));
    // }, [dispatch])

    // console.log(selectedTask)

    return (
        <Drawer variant="permanent" open={drawer} anchor="left">
            <Toolbar />
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
                        {drawer ? <ChevronLeftIcon sx={{fontSize: "1.3rem"}}/> : <ChevronRightIcon sx={{fontSize: "1.3rem"}}/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{overflow: "auto"}}>
                    <List>
                        {drawer && <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                                color: theme.palette.warning.main,
                                display: "flex",
                                gap: "0.5rem",
                                padding: '0.5rem 1rem',
                            }}>
                            <AutorenewOutlinedIcon/>
                            In progress:
                        </Typography>}

                        {!tasks.length && (
                            <Box sx={{paddingLeft: "1.5rem"}}>
                                <Typography variant="body1">{drawer && "No task"}</Typography>
                            </Box>
                        )}
                        {tasks.map((task) => (
                            <LeftSectionListItem task={task} key={task.id} />
                        ))}
                    </List>

                    {(drawer || tasks.length) && <Divider/>}

                    <List>
                        {drawer && <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                                color: theme.palette.success.light,
                                display: "flex",
                                gap: "0.5rem",
                                padding: '0.5rem 1rem',
                            }}>
                            <PublishedWithChangesOutlinedIcon/>
                            Completed:
                        </Typography>}

                        {!completedTasks.length && (
                            <Box sx={{paddingLeft: "1.5rem"}}>
                                <Typography variant="body1">{drawer && "No task"}</Typography>
                            </Box>
                        )}
                        {completedTasks.map((task) => (
                            <LeftSectionListItem task={task} key={task.id}/>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
}