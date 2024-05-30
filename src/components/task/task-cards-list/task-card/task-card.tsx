import React, {useCallback} from "react";
import {completeTask, Task} from "../../task-slice";
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

interface TaskCardProps {
    task: Task;
}

export const TaskCard = (props: TaskCardProps) => {
    const dispatch = useAppDispatch();
    const {task} = props;
    const [expanded, setExpanded] = React.useState(false);
    // const value = useAppSelector(selectValueCalendarDay);

    const handleExpandTask = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    const handleCompleteTask = useCallback((taskId: string) => {
        dispatch(completeTask(taskId));
    }, [dispatch]);

    // console.log(task.scheduledDate === value)
    // console.log(task.scheduledDate )
    // console.log("value", value)

    const handleEditTask = useCallback((taskId: string) => {
        console.log(taskId);
    }, []);


    return (
        <Card variant="outlined" sx={{
            border: 'none',
            borderBottom: `1px solid lightgray`,
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
                            <Tooltip title="Fulfill task" placement="top" arrow>
                                <IconButton onClick={() => handleCompleteTask(task.id)}>
                                    <CheckIcon sx={{fontSize: "1.3rem"}}/>
                                </IconButton>
                            </Tooltip>
                            <Typography variant="subtitle1" sx={{color: "black"}}>{task.name}</Typography>
                        </Box>

                        <Box>
                            <Tooltip title="Edit task" placement="top" arrow>
                                <IconButton aria-label="settings" onClick={() => handleEditTask(task.id)}>
                                    <EditIcon sx={{fontSize: "1.3rem"}}/>
                                </IconButton>
                            </Tooltip>
                            {task.description && (
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandTask}
                                    // aria-expanded={expanded}
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

            {/*<Box sx={{display: "flex", justifyContent: "center"}}>*/}
            {/*{task.description && (*/}
            {/*    <CardActions sx={{display: "flex"}}>*/}
            {/*        <ExpandMore*/}
            {/*            expand={expanded}*/}
            {/*            onClick={handleExpandTask}*/}
            {/*            // aria-expanded={expanded}*/}
            {/*            aria-label="show more"*/}
            {/*        >*/}
            {/*            <ExpandMoreIcon sx={{display: "flex"}}/>*/}
            {/*        </ExpandMore>*/}
            {/*    </CardActions>*/}
            {/*)}*/}
            {/*</Box>*/}

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    paddingLeft: "3rem",
                    '&:last-child': {
                        paddingBottom: "0.5rem",
                    },
                }}>
                    {task.description && (
                        <Typography variant="body2" sx={{color: "gray"}} gutterBottom>{task.description}</Typography>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}