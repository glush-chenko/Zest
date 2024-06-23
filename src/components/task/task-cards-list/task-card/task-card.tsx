import React, {useCallback, useEffect, useMemo} from "react";
import {completeTask, removeTask, selectTask, setEditingTaskId, Task} from "../../task-slice";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import {ExpandMore} from "../../../styled/expand-more";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {useAppDispatch} from "../../../../app/hooks";
import {useTheme} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {AlertDialog} from "../../../generic/alert-dialog";
import {useNavigate} from "react-router-dom";
import Divider from '@mui/material/Divider';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {PRIORITY} from "../task-card-edit/task-card-edit";

export interface TaskCardProps {
    /**
     * The task that we display as a card
     */
    task: Task;
}

export const TaskCard = (props: TaskCardProps) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const {task} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);


    const handleExpandTask = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    const handleCompleteTask = useCallback((taskId: string) => {
        dispatch(completeTask(taskId));
    }, [dispatch]);

    const handleEditTask = useCallback((taskId: string) => {
        dispatch(setEditingTaskId(taskId));
    }, [dispatch]);

    const handleDeleteTask = useCallback((taskId: string) => {
        dispatch(removeTask(taskId));
        setOpenAlertDialog(false);
    }, [dispatch]);

    const handleCancelTask = useCallback(() => {
        setOpenAlertDialog(false);
    }, []);

    const handleAlertDialogOpen = useCallback(() => {
        setOpenAlertDialog(true);
    }, []);

    const handleTaskClick = useCallback((taskId: string) => {
        // dispatch(selectTask(taskId));
        dispatch(setEditingTaskId(taskId));
        // navigate(`/tasks/${taskId}`);
    }, [dispatch])

    const getPriorityLabel = useMemo(() => {
        const priorityItem = PRIORITY.find(item => item.value === task.priority);
        return priorityItem ? priorityItem.label : "";
    }, [PRIORITY, task]);


    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    border: 'none',
                    flexGrow: 1,
                }}
            >
                <CardHeader
                    subheader={
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem"
                            }}>
                                    <IconButton
                                        onClick={() => handleCompleteTask(task.id)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: "transparent"
                                            },
                                            padding: 0
                                        }}
                                    >
                                        <Box
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            {isHovered ?
                                                <CheckCircleOutlineIcon sx={{fontSize: "1.4rem", color: `${getPriorityLabel}`}}/> :
                                                <RadioButtonUncheckedIcon sx={{fontSize: "1.4rem", color: `${getPriorityLabel}`}}/>}
                                        </Box>
                                    </IconButton>


                                <Typography
                                    variant="subtitle1"
                                    color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}
                                    onClick={() => handleTaskClick(task.id)}
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer"
                                        },
                                        textDecoration: task.completed ? 'line-through' : "none",
                                        // '& .MuiTypography-root .MuiTypography-subtitle1': {
                                        //     textDecoration: task.completed ? 'line-through' : "none",
                                        // },
                                    }}
                                >
                                    {task.name}
                                </Typography>
                            </Box>

                            <Box>
                                <Tooltip title="Edit task" placement="top" arrow>
                                    <IconButton
                                        aria-label="settings"
                                        onClick={() => handleEditTask(task.id)}
                                    >
                                        <EditIcon sx={{fontSize: "1.3rem"}}/>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete task" placement="top" arrow>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={handleAlertDialogOpen}
                                    >
                                        <DeleteOutlineIcon
                                            sx={{
                                                fontSize: "1.3rem",
                                                color: theme.palette.error.main
                                            }}/>
                                    </IconButton>
                                </Tooltip>
                                {task.description && (
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandTask}
                                        aria-label="show more"
                                    >
                                        <Tooltip title="Show more" placement="top" arrow>
                                            <ExpandMoreIcon sx={{fontSize: "1.3rem"}}/>
                                        </Tooltip>
                                    </ExpandMore>
                                )}
                            </Box>
                        </Box>
                    }
                    sx={{
                        padding: "0.3rem 0.5rem",
                    }}
                />

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 0,
                        paddingLeft: "2rem",
                        '&:last-child': {
                            paddingBottom: "0.5rem",
                        },
                    }}>
                        {task.description && (
                            <Typography
                                variant="body2"
                                sx={{color: theme.palette.grey[500]}}
                                gutterBottom
                            >
                                {task.description}
                            </Typography>
                        )}
                    </CardContent>
                </Collapse>
            </Card>
            <Divider />

            {openAlertDialog && (
                <AlertDialog
                    title="Deleting a task"
                    text={`Are you sure you want to delete ${task.name}?`}
                    onCancel={handleCancelTask}
                    onSuccess={() => handleDeleteTask(task.id)} />
            )}
        </>
    );
}