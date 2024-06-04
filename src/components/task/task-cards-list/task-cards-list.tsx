import React, {Dispatch, SetStateAction} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../../app/hooks";
import {selectTasks} from "../task-slice";
import {TaskCard} from "./task-card/task-card";
import {selectRightSection} from "../../../features/main/right-section/right-section-slice";
import dayjs from "dayjs";
import dogSwimming from "../../../assets/dog-swimming.svg"
import {useTheme} from "@mui/material";
import {TaskCardEdit} from "./task-card-edit/task-card-edit";

export const TaskCardsList = () => {
    const {tasks, editingTaskId} = useAppSelector(selectTasks);
    const {selectedDate} = useAppSelector(selectRightSection);
    const hasTaskOnSelectedDate = tasks.some((task) => task.scheduledDate === selectedDate);
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0",
                height: "100%"
            }}>
                <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
                    Tasks for {`${dayjs(selectedDate).format("ddd, DD MMM YYYY")}`}
                </Typography>

                {hasTaskOnSelectedDate ? (
                    tasks.filter((t) => !t.completed).map((task) => {
                        if (task.scheduledDate === selectedDate) {
                            return (
                                <Box key={task.id}>
                                    {editingTaskId === task.id ? (
                                        <TaskCardEdit
                                            selectedTask={task}
                                        />
                                    ) : (
                                        <TaskCard
                                            task={task}
                                            key={task.id}
                                        />
                                    )}
                                </Box>
                            )
                        }
                    })
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Box
                            component="img"
                            src={dogSwimming}
                            maxWidth="20rem"
                            alt="cards-image-dog"
                        />
                        <Typography variant="subtitle1" sx={{
                            color: theme.palette.text.primary,
                            textAlign: 'center',
                            '& span': {
                                display: 'block'
                            },
                            '& span:first-of-type': {
                                fontWeight: 'bold',
                            }
                        }} gutterBottom>
                            <span>It looks like you have no scheduled tasks for today</span>
                            <span>Well, a great reason to do something you really like or start a new business!</span>
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    )
}