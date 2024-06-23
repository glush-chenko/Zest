import React, {useCallback} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import {selectTask, Task} from "../../../../components/task/task-slice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectDrawerOpen} from "../left-section-slice";
import {SvgIconComponent} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface LeftSectionListItemProps {
    task: Task;
    icon: SvgIconComponent;
    done: boolean;
}

export const LeftSectionListItem = (props: LeftSectionListItemProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const {task, icon: Icon, done} = props;
    const drawer = useAppSelector(selectDrawerOpen);
    const [isHovered, setIsHovered] = React.useState(false);


    const handleTaskClick = useCallback((taskId: string) => {
        if (!done) {
            dispatch(selectTask(taskId));
            navigate(`/tasks/${taskId}`);
        }
    }, [dispatch, navigate])

    return (
        <List sx={{padding: 0}}>
            <ListItem disablePadding sx={{display: 'block'}} onClick={() => handleTaskClick(task.id)}>
                <ListItemButton
                    sx={{
                        minHeight: 30,
                        justifyContent: drawer ? 'initial' : 'center',
                        px: 2.5,
                        padding: '0.5rem 1rem',
                    }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: drawer ? 1 : 0,
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{display: "flex"}}
                            onMouseOver={() => setIsHovered(true)}
                            onMouseOut={() => setIsHovered(false)}
                        >
                            {isHovered ?
                                <EditIcon sx={{fontSize: "1.3rem"}} />
                                :
                                <Icon
                                    sx={{
                                        color: done ? theme.palette.success.light : theme.palette.primary.light
                                    }}
                                />
                            }
                        </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary={task.name}
                        sx={{
                            opacity: drawer ? 1 : 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: drawer ? "auto" : 0,
                            flexGrow: 0
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    );
}