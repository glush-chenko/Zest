import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../../app/hooks";
import {selectTasks} from "../task-slice";
import {TaskCard} from "./task-card/task-card";
import {selectValueCalendarDay} from "../../../features/main/right-section/right-section-slice";
import {getWeekDates} from "../../../utils/get-week-dates";

export const TaskCardsList = () => {
    const weekDates = getWeekDates();
    const {tasks} = useAppSelector(selectTasks);
    const {valueCalendarDay, dayOfWeek} = useAppSelector(selectValueCalendarDay);
    // const selectedDate = useAppSelector(selectDate);
    //new Date().toDateString()


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0"
            }}>
                <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
                    Tasks for {`${weekDates[dayOfWeek].format("ddd, DD MMM YYYY")}`}
                </Typography>
                {/*{tasks.map((task) => (*/}
                {/*    <Box key={task.id}>*/}
                {/*        <TaskCard task={task} key={task.id}/>*/}
                {/*    </Box>*/}
                {/*))}*/}
                {tasks.map((task) => {
                    if (task.scheduledDate === valueCalendarDay) {
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