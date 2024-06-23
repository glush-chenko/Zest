import React from "react";
import {useSearchParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../app/hooks";
import {selectTasks} from "../../components/task/task-slice";
import Typography from "@mui/material/Typography";
import {TaskCard} from "../../components/task/task-cards-list/task-card/task-card";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";

export const SearchPage = () => {
    const {tasks} = useAppSelector(selectTasks);
    const [searchParams] = useSearchParams()
    const taskNameToFind = searchParams.get("name");

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(taskNameToFind?.toLowerCase() || '')
    );
    return (
        <Box
            sx={{
                // display: 'flex',
                // flexDirection: "column",
                // gap: "1rem",
                height: "100%",
                width: "100%",
                padding: "2rem 4rem",
            }}
        >
            <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            {filteredTasks.map(task => (
                <Box key={task.id}>
                    <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
                        Tasks for {`${dayjs(task.scheduledDate).format("ddd, DD MMM YYYY")}`}
                    </Typography>

                    <TaskCard task={task}/>
                </Box>
            ))}
            </Box>
        </Box>
    )
}