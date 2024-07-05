import React, {Fragment, useCallback, useMemo} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import {NavLink} from "react-router-dom";
import {LeftSectionListItem} from "../left-section-list-item/left-section-list-item";
import DoneIcon from "@mui/icons-material/CheckCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import List from "@mui/material/List";
import {Task} from "../../../../components/task/task-slice";
import {useAppSelector} from "../../../../app/hooks";
import {selectDrawerOpen} from "../left-section-slice";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import {useTheme} from "@mui/material";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import Skeleton from "@mui/material/Skeleton";
import {selectTodoistLoading} from "../../../../api/todoist-api";

interface TasksSectionProps {
    active: boolean,
    tasks: Task[],
    isLoggedIn: boolean
}

export const TasksSection = (props: TasksSectionProps) => {
    const {active, tasks, isLoggedIn} = props;
    const theme = useTheme();

    const drawer = useAppSelector(selectDrawerOpen);
    const loading = useAppSelector(selectTodoistLoading);

    const showSkeleton = useMemo(() => {
        return loading && isLoggedIn;
    }, [loading, isLoggedIn]);

    const sortByPriority = useMemo(() => {
        return [...tasks].sort((a, b) => +b.priority - +a.priority);
    }, [tasks]);

    return (
        <Box sx={{width: "100%"}}>
            {drawer && (
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{
                        color: active ? theme.palette.primary.light : theme.palette.success.main,
                        display: "flex",
                        gap: "0.2rem",
                        padding: '0.5rem 1.2rem',
                        margin: 0,
                        fontSize: "1rem",
                    }}
                >
                    {active ? <AutorenewOutlinedIcon/> : <PublishedWithChangesOutlinedIcon/>}
                    {active ? "In progress:" : "Completed:"}
                </Typography>
            )}

            <List
                sx={{
                    padding: "0.5rem"
                }}
            >
                {showSkeleton ? (
                    <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        {Array.from({length: 10}).map((_, index) => (
                            <Box key={index} sx={{display: "flex", gap: "0.5rem"}}>
                                <Skeleton variant="circular" width={30} height={30}/>
                                <Skeleton variant="rectangular" width={150} height={30} sx={{borderRadius: "0.5rem"}}/>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <>
                        {!tasks.length && (
                            <Box>
                                <Typography variant="body1">
                                    {(drawer && active) && "No active tasks"}
                                    {(drawer && !active) && "No completed tasks"}
                                </Typography>
                            </Box>
                        )}

                        {sortByPriority.map((task) => (
                            <Tooltip title={task.name} placement="right" key={task.id} arrow>
                                <NavLink
                                    to={active ? `/tasks/${task.id}` : `/activity/${task.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                >
                                    {isLoggedIn && (
                                        <LeftSectionListItem
                                            task={task}
                                            icon={active ? CircleOutlinedIcon : DoneIcon}
                                            done={!active}
                                        />
                                    )}
                                </NavLink>
                            </Tooltip>

                        ))}
                    </>
                )}
            </List>
        </Box>
    )
}