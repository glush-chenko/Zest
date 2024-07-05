import React, {useEffect, useMemo} from "react";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import {Task} from "../../../components/task/task-slice";
import {useTheme} from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useNavigate, useParams} from "react-router-dom";
import {PRIORITY} from "../../../components/task/task-cards-list/task-card-edit/task-card-edit";
import { Link } from 'react-router-dom';

interface ActivityCardProps {
    completed: boolean;
    task: Task;
    boxRef: React.RefObject<HTMLDivElement> | null;
    prioritySort: boolean;
}

export const ActivityListItem = (props: ActivityCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {completed, task, boxRef, prioritySort} = props;
    const {id} = useParams<{ id: string }>();
    const taskRef = React.useRef<HTMLDivElement | null>(null);
    const [shouldResetStyles, setShouldResetStyles] = React.useState(false);
    const [underline, setUnderline] = React.useState(false);

    useEffect(() => {
        if (id && taskRef.current && boxRef?.current) {
            const {offsetTop} = taskRef.current;
            const boxHeight = boxRef.current.clientHeight || 0;

            if (offsetTop < boxRef.current.scrollTop || offsetTop > boxRef.current.scrollTop + boxRef.current.clientHeight) {
                boxRef.current.scrollTop = Math.max(0, offsetTop - boxHeight);
            }

            setShouldResetStyles(true);
            const timeoutId = setTimeout(() => {
                setShouldResetStyles(false);
                navigate("/activity");
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [id, taskRef, boxRef]);

    const getPriorityLabel = useMemo(() => {
        const priorityItem = PRIORITY.find(item => item.value === task.priority);
        return priorityItem ? priorityItem.label : "";
    }, [PRIORITY, task]);

    return (
        <Box
            ref={task.id === id ? taskRef : null}
            sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                backgroundColor: task.id === id && shouldResetStyles ? theme.palette.action.selected : 'inherit',
                padding: task.id === id && shouldResetStyles ? '0.5rem' : '0',
                borderRadius: task.id === id && shouldResetStyles ? '4px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
                [theme.breakpoints.down('sm')]: {
                    gap: 0
                }
            }}
        >

            {completed ? (
                <AssignmentTurnedInIcon
                    sx={{
                        color: prioritySort ? `${getPriorityLabel}` : theme.palette.success.main,
                        fontSize: "2rem",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "1.7rem"
                        }
                    }}
                />
                ) : (
                <AssignmentIcon
                    sx={{
                        color: prioritySort ? `${getPriorityLabel}` : theme.palette.warning.light,
                        fontSize: "2rem",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "1.7rem"
                        }
                    }}
                />
            )}


            <Box
                sx={{
                    display: "flex",
                    gap: "0.5rem",
                    overflow: "hidden"
                }}
            >
                <Box sx={{display: "flex", gap: "0.3rem", overflow: "hidden"}}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600],
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {`${dayjs(task.completed ? task.completedAt! : task.createdAt).format(
                            'HH:mm'
                        )}`}
                    </Typography>

                    <Typography variant="body2" sx={{
                        [theme.breakpoints.down('md')]: {
                            fontSize: "0.85rem"
                        },
                        display: "flex",
                        alignItems: "center",
                        textWrap: "nowrap"
                    }}>
                        {completed ?
                            `Completed the task:`
                            :
                            `Added a task:`
                        }
                    </Typography>

                    <Link
                        to={`/tasks/${task.id}`}
                        style={{
                            fontSize: "0.9rem",
                            color: theme.palette.mode === "light" ? `${theme.palette.grey[600]}` : `${theme.palette.grey[500]}`,
                            textDecoration: underline ? "underline" : 'none',
                            textWrap: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        onMouseOver={() => setUnderline(true)}
                        onMouseOut={() => setUnderline(false)}
                    >
                        {task.name}
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}