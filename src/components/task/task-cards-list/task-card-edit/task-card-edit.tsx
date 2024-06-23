import React, {useCallback, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {Dayjs} from "dayjs";
import {completeTask, selectTask, setEditingTaskId, Task, uncompleteTask, updateTask} from "../../task-slice";
import FlagIcon from '@mui/icons-material/Flag';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../../app/hooks";
import {useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {TaskCardEditTextField} from "../../task-card-edit-text-field/task-card-edit-text-field";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Pallete} from "../../../../theme/theme";

export const PRIORITY = [
    {
        value: 'Priority 1',
        label: Pallete.light.palette.error.main,
    },
    {
        value: 'Priority 2',
        label: Pallete.light.palette.warning.light,
    },
    {
        value: 'Priority 3',
        label: Pallete.light.palette.info.main,
    },
    {
        value: 'Priority 4',
        label: Pallete.light.palette.grey[500],
    },
];

interface TaskCardEditProps {
    selectedTask: Task | null;
}

export const TaskCardEdit = (props: TaskCardEditProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {selectedTask} = props;
    const [name, setName] = React.useState(selectedTask ? selectedTask.name : "");
    const [description, setDescription] = React.useState(selectedTask ? selectedTask.description : "");
    const [date, setDate] = React.useState<Dayjs | null>(
        selectedTask ? dayjs(selectedTask.scheduledDate) : dayjs()
    );
    const [nameError, setNameError] = React.useState<boolean>(false);
    const [selectedPriority, setSelectedPriority] = React.useState("Priority 4");
    const [isHovered, setIsHovered] = React.useState(false);

    useEffect(() => {
        if (selectedTask) {
            setSelectedPriority(selectedTask.priority);
        }
    }, [selectedTask]);

    const handleDateChange = useCallback((value: Dayjs | null) => {
        setDate(value);
    }, []);

    const handleTextFieldChange = useCallback((text: string) => {
        setName(text);
        setNameError(text.trim() === "");
    }, []);

    const handleDescriptionFieldChange = useCallback((description: string) => {
        setDescription(description);
    }, []);

    const handleSaveTask = useCallback(() => {
        if (selectedTask) {
            dispatch(updateTask({
                id: selectedTask.id,
                name: name,
                description: description,
                scheduledDate: date ? date.startOf('day').valueOf() : dayjs().startOf('day').valueOf(),
                priority: selectedPriority,
            }))
            dispatch(setEditingTaskId(null));
            navigate("/tasks")
        } else {
            console.error("Can't save the task because selectedTask is undefined")
        }
        dispatch(selectTask(""));
    }, [dispatch, selectedTask, name, date, description, navigate, selectedPriority]);



    const handleCompleteTask = useCallback((task: Task | null) => {
        if (task) {
            if (task.completed) {
                dispatch(uncompleteTask(task.id));
                dispatch(selectTask(task.id));
            } else {
                dispatch(completeTask(task.id));
                dispatch(selectTask(task.id));
                // handleCloseTask();
            }
        }
    }, [dispatch]);

    return (
        <Card
            variant="outlined"
            sx={{
                width: "100%",
                height: "100%",
                padding: "1rem"
            }}
        >

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "3rem",
                    height: "90%",
                }}
            >
                <Box sx={{display: "flex", gap: "1rem"}}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Tooltip
                            title={selectedTask?.completed ? "Cancel fulfill" : "Fulfill task"}
                            placement="top"
                            arrow
                        >
                            <IconButton
                                onClick={() => handleCompleteTask(selectedTask)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: "transparent"
                                    },
                                    padding: 0
                                }}
                            >
                                {selectedTask?.completed ? (
                                    <Box>
                                        <CheckCircleIcon sx={{fontSize: "1.7rem"}}/>
                                    </Box>
                                ) : (
                                    <Box
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        {isHovered ? <CheckCircleOutlineIcon sx={{fontSize: "1.7rem"}}/> :
                                            <RadioButtonUncheckedIcon sx={{fontSize: "1.7rem"}}/>}
                                    </Box>
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <TaskCardEditTextField
                        name={name}
                        description={description}
                        nameError={nameError}
                        completed={selectedTask ? selectedTask.completed : null}
                        onTextFieldChange={handleTextFieldChange}
                        onDescriptionFieldChange={handleDescriptionFieldChange}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "space-between",
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slotProps={{
                                textField: {
                                    size: "small",
                                    style: {
                                        width: "9rem"
                                    },
                                }
                            }}
                            sx={{
                                alignItems: "flex-start",
                                display: "flex",
                                height: "100%",
                            }}
                            value={date}
                            onChange={handleDateChange}
                            views={['day', 'month']}
                            disabled={selectedTask?.completed}
                        />
                    </LocalizationProvider>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "0.5rem",
                        }}
                    >

                        <TextField
                            value={selectedPriority}
                            size="small"
                            select
                            sx={{
                                flex: 2,
                                '& .MuiSelect-icon': {
                                    display: 'none',
                                },
                                "& .MuiSelect-select.MuiOutlinedInput-input": {
                                    height: "2.5rem",
                                    boxSizing: "border-box"
                                },
                            }}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            label="Priority"
                            disabled={selectedTask?.completed}
                        >
                            {PRIORITY.map((option) => (
                                <MenuItem
                                    sx={{
                                        display: "flex",
                                    }}
                                    value={option.value}
                                    key={option.value}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <FlagIcon sx={{fontSize: "1.3rem", color: `${option.label}`}}/>
                                        <Typography variant="subtitle1">
                                            {option.value}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            sx={{
                                flex: 1,
                                height: "100%",
                                lineHeight: 1
                            }}
                            onClick={handleSaveTask}
                            disabled={selectedTask?.completed || nameError}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    )
        ;
}