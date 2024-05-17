import React, {useCallback} from 'react';
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
import {DrawerHeader} from '../../../components/styled/drawer-header';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDrawerOpen, toggleDrawer} from "./left-section-slice";
import { Typography } from '@mui/material';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const PROGRESS = ["feed the cat", "vacuum the house under the sofas", "take out the trash", " listen to classical music", "watch new releases of your favorite show", "shop for home, go to an unknown place", "travel in nature, rollerblade and skate in the summer", "learn to dive and sew a cross", "look at the waterfall and take a picture with it"];
const COMPLETED = ["sleep with a toy by your side", "Sit and enjoy life in the rays of the spring sun", "Go and make a delicious breakfast, imagining that you are a great chef", "swim with your favorite toys in soap suds", "hug all your friends ten times", "invite everyone to eat a New Year's dish in the summer"];

export const LeftSection = () => {
    const dispatch = useAppDispatch();
    const drawer = useAppSelector(selectDrawerOpen);

    const handleDrawerOpen = useCallback(() => {
        dispatch(toggleDrawer(true));
    }, [toggleDrawer, dispatch]);

    const handleDrawerClose = useCallback(() => {
        dispatch(toggleDrawer(false));
    }, [toggleDrawer, dispatch]);

    return (
        <Box sx={{ display: 'flex', position: "fixed"}}>
            <Drawer variant="permanent" open={drawer}>
                <DrawerHeader>
                    <IconButton onClick={drawer ? handleDrawerClose : handleDrawerOpen}>
                        {drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {drawer && <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                            color: "#7C2090",
                            display: "flex",
                            gap: "0.5rem",
                            padding: '0.5rem 1rem',
                        }}>
                        <AutorenewOutlinedIcon />
                        In progress:
                    </Typography>}
                    {PROGRESS.map((text) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawer ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawer ? 1 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CircleOutlinedIcon sx={{width: 30, height: 30}}/>
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: drawer ? 1 : 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {drawer && <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                            color: "#2E7D32",
                            display: "flex",
                            gap: "0.5rem",
                            padding: '0.5rem 1rem',
                        }}>
                        <PublishedWithChangesOutlinedIcon />
                        Completed:
                    </Typography>}
                    {COMPLETED.map((text) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawer ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawer ? 1 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CheckCircleOutlinedIcon sx={{width: 30, height: 30}}/>
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: drawer ? 1 : 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            </Box>
        </Box>
    );
}