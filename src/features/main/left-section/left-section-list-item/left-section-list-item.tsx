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
interface LeftSectionListItemProps {
    task: Task;
    icon: SvgIconComponent;
}
export const LeftSectionListItem = (props: LeftSectionListItemProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {task, icon: Icon} = props;
    const drawer = useAppSelector(selectDrawerOpen);

    const handleTaskClick = useCallback((taskId: string) => {
        dispatch(selectTask(taskId));
        navigate(`/tasks/${taskId}`);
    }, [dispatch])

    return (
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
                        mr: drawer ? 1 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <Icon />
                </ListItemIcon>
                <ListItemText
                    primary={task.name}
                    sx={{
                        opacity: drawer ? 1 : 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: "100"
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}