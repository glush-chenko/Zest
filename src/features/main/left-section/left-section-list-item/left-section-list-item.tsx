import React, {useCallback} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import {selectTask, Task} from "../../../../components/task/task-slice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectDrawerOpen} from "../left-section-slice";
interface LeftSectionListItemProps {
    task: Task;
}
export const LeftSectionListItem = (props: LeftSectionListItemProps) => {
    const dispatch = useAppDispatch();
    const {task} = props;
    const drawer = useAppSelector(selectDrawerOpen);

    const handleTaskClick = useCallback((taskId: string) => {
        dispatch(selectTask(taskId));
    }, [dispatch])

    return (
        <ListItem disablePadding sx={{display: 'block'}} onClick={() => handleTaskClick(task.id)}>
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
                <ListItemText primary={task.name} sx={{
                    opacity: drawer ? 1 : 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}/>
            </ListItemButton>
        </ListItem>
    );
}