import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../../app/hooks";
import {selectTasks} from "../task-slice";
import {TaskCard} from "./task-card/task-card";
import {selectRightSection} from "../../../features/main/right-section/right-section-slice";
import dayjs from "dayjs";

export const TaskCardsList = () => {
    const {tasks} = useAppSelector(selectTasks);
    const {selectedDate} = useAppSelector(selectRightSection);

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0"
            }}>
                <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
                    Tasks for {`${dayjs(selectedDate).format("ddd, DD MMM YYYY")}`}
                </Typography>

                {tasks.filter((t) => !t.completed).map((task) => {
                    if (task.scheduledDate === selectedDate) {
                        return (
                            <Box key={task.id}>
                                <TaskCard task={task} key={task.id}/>
                            </Box>
                        )
                    }
                })}
            </Box>
        </>
    )
}