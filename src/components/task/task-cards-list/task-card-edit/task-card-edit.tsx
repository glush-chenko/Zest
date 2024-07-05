import React, {useCallback, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {Dayjs} from "dayjs";
import {
    completeTask, removeTask,
    selectTask,
    setEditingTaskId,
    Task,
    uncompleteTask,
    updateTask
} from "../../task-slice";
import FlagIcon from '@mui/icons-material/Flag';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {TaskCardEditTextField} from "../../task-card-edit-text-field/task-card-edit-text-field";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Pallete} from "../../../../theme/theme";
import {
    closeTask,
    deleteTaskSync,
    reopenTaskSync,
    updateTaskContent
} from "../../../../api/todoist-api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {selectToken} from "../../../../pages/login/login-slice";

export const PRIORITY = [
    {
        value: '4',
        text: "priority 1",
        label: Pallete.light.palette.error.main,
    },
    {
        value: '3',
        text: "priority 2",
        label: Pallete.light.palette.warning.light,
    },
    {
        value: '2',
        text: "priority 3",
        label: Pallete.light.palette.info.main,
    },
    {
        value: '1',
        text: "priority 4",
        label: Pallete.light.palette.grey[500],
    },
];

interface TaskCardEditProps {
    selectedTask: Task | null;
}

export const TaskCardEdit = (props: TaskCardEditProps) => {
    const {selectedTask} = props;

    const token = useAppSelector(selectToken)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [nameError, setNameError] = React.useState<boolean>(false);
    const [selectedPriority, setSelectedPriority] = React.useState("1");

    useEffect(() => {
        if (selectedTask) {
            setSelectedPriority(selectedTask.priority);
            setName(selectedTask.name);
            setDescription(selectedTask.description);
            setDate(selectedTask.scheduledDate ? dayjs(selectedTask.scheduledDate) : dayjs());
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
            if (token) {
                dispatch(updateTaskContent({
                    taskId: selectedTask.id,
                    content: {
                        content: name,
                        description,
                        due_date: date?.format('YYYY-MM-DD'),
                        priority: selectedPriority,
                    }
                }))
            } else {
                dispatch(updateTask({
                    id: selectedTask.id,
                    name: name,
                    description: description,
                    scheduledDate: date ? date.startOf('day').valueOf() : dayjs().startOf('day').valueOf(),
                    priority: selectedPriority,
                }))
            }
            dispatch(setEditingTaskId(null));
            navigate("/tasks")
        } else {
            console.error("Can't save the task because selectedTask is undefined")
        }
        dispatch(selectTask(""));
    }, [dispatch, selectedTask, name, date, description, navigate, selectedPriority, token]);


    const handleCompleteTask = useCallback((task: Task | null) => {
        if (task) {
            if (task.completed) {
                if (token) {
                    dispatch(reopenTaskSync(task.id))
                    navigate("/");
                } else {
                    dispatch(uncompleteTask(task.id));
                    dispatch(selectTask(task.id));
                }
            } else {
                if (token) {
                    dispatch(closeTask(task.id))
                    navigate("/");
                } else {
                    dispatch(completeTask(task.id));
                    dispatch(selectTask(task.id));
                }
            }
        }
    }, [dispatch, token]);

    const handleDeleteTask = useCallback((task: Task | null) => {
        if (task) {
            if (token) {
                dispatch(deleteTaskSync(task.id));
                navigate("/");
            } else {
                dispatch(removeTask(task.id));
                navigate("/");
            }
        }
    }, [dispatch, token])

    return (
        <Card
            variant="outlined"
            sx={{
                width: "100%",
                // height: "100%",
            }}
        >

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "3rem",
                    [theme.breakpoints.down('md')]: {
                        gap: "2rem"
                    },
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
                                    <Box sx={{
                                        "& .MuiCardHeader-content": {
                                            overflowWrap: "anywhere"
                                        },
                                        "& .check-circle": {
                                            display: "none",
                                        },
                                        "& .unchecked-radio": {
                                            display: "flex",
                                        },
                                        "&:hover": {
                                            "& .check-circle": {
                                                display: "flex",
                                            },
                                            "& .unchecked-radio": {
                                                display: "none",
                                            },
                                        },
                                    }}>
                                        <CheckCircleOutlineIcon
                                            className="check-circle"
                                            sx={{fontSize: "1.7rem"}}
                                        />
                                        <RadioButtonUncheckedIcon
                                            className="unchecked-radio"
                                            sx={{fontSize: "1.7rem"}}
                                        />
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
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Tooltip title="Delete task" placement="top" arrow>
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: "transparent"
                                    },
                                    padding: 0,
                                }}
                                onClick={() => handleDeleteTask(selectedTask)}
                            >
                                <DeleteOutlineIcon
                                    sx={{
                                        fontSize: "1.5rem",
                                        color: theme.palette.error.main
                                    }}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Box
                    flexDirection={{xs: 'column', md: 'row'}}
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                        [theme.breakpoints.down('md')]: {
                            gap: "0.5rem"
                        },
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        width: "100%",
                        [theme.breakpoints.down("sm")]: {
                            gap: "0.3rem"
                        },
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        style: {
                                            maxWidth: "9rem",
                                            width: "100%"
                                        },
                                    }
                                }}
                                sx={{
                                    alignItems: "flex-start",
                                    display: "flex",
                                    height: "100%",
                                    flex: 1,
                                }}
                                value={date}
                                onChange={handleDateChange}
                                views={['day', 'month']}
                                disabled={selectedTask?.completed}
                                label="Date"
                            />
                        </LocalizationProvider>

                        <TextField
                            defaultValue="priority 1"
                            value={selectedPriority}
                            size="small"
                            select
                            sx={{
                                flex: 1,
                                maxWidth: "9rem",
                                [theme.breakpoints.down("sm")]: {
                                    maxWidth: "7rem"
                                },
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
                                            {option.text}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{minWidth: "5rem", maxWidth: "5rem"}}>
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            sx={{
                                flex: 1,
                                height: "100%",
                                lineHeight: 1,
                                minHeight: "2.5rem"
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