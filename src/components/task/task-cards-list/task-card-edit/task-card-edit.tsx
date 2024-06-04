import React, {ChangeEvent, useCallback} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {Dayjs} from "dayjs";
import {selectTask, setEditingTaskId, Task, updateTask} from "../../task-slice";
import FlagIcon from '@mui/icons-material/Flag';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../../app/hooks";
import {useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const PRIORITY = [
    {
        value: 'Priority 1',
        label: "red",
    },
    {
        value: 'Priority 2',
        label: "orange",
    },
    {
        value: 'Priority 3',
        label: "blue",
    },
    {
        value: 'Priority 4',
        label: "gray",
    },
];

interface TaskCardEditProps {
    selectedTask: Task | null;
}

export const TaskCardEdit = (props: TaskCardEditProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const {selectedTask} = props;
    const [name, setName] = React.useState(selectedTask ? selectedTask.name : "");
    const [description, setDescription] = React.useState(selectedTask ? selectedTask.description : "");
    const [date, setDate] = React.useState<Dayjs | null>(
        selectedTask ? dayjs(selectedTask.scheduledDate) : dayjs()
    );
    const [nameError, setNameError] = React.useState<boolean>(false);

    const handleDateChange = useCallback((value: Dayjs | null) => {
        setDate(value);
    }, []);

    const handleTextFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
        setNameError(event.target.value.trim() === "");
    }, []);

    const handleDescriptionFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }, []);

    const handleSaveTask = useCallback(() => {
        if (selectedTask) {
            dispatch(updateTask({
                id: selectedTask.id,
                name: name,
                description: description,
                scheduledDate: date ? date.startOf('day').valueOf() : dayjs().startOf('day').valueOf(),
            }))
            dispatch(setEditingTaskId(null));
            navigate("/tasks")
        } else {
            console.error("Can't save the task because selectedTask is undefined")
        }
        dispatch(selectTask(""));
    }, [dispatch, selectedTask, name, date, description, navigate]);

    const handleCloseTask = useCallback(() => {
        dispatch(selectTask(""));
        dispatch(setEditingTaskId(null));
        navigate("/tasks")
    }, [dispatch, navigate])

    return (
        <Card
            elevation={0}
            variant="outlined"
            sx={{
                border: `1px solid ${theme.palette.grey[500]}`,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h6">Task edit</Typography>
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseTask}
                >
                    <CloseIcon sx={{fontSize: "1.3rem"}}/>
                </IconButton>
            </Box>

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >

                <TextField
                    autoFocus
                    multiline
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            overflowWrap: 'break-word',
                        },
                    }}
                    value={name}
                    variant="standard"
                    onChange={(e) => handleTextFieldChange(e)}
                    error={nameError}
                    helperText={nameError ? "The field must be filled in" : ""}
                    inputProps={{
                        maxLength: 100,
                    }}
                />
                {/*</Box>*/}

                <TextField
                    multiline
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            overflowWrap: 'break-word',
                        },
                    }}
                    value={description}
                    variant="standard"
                    onChange={(e) => handleDescriptionFieldChange(e)}
                />

                <Box sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                    height: "2.5rem"
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slotProps={{
                                textField: {
                                    size: "small",
                                    style: {
                                        width: "7.7rem"
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
                        />
                    </LocalizationProvider>

                    <Box sx={{
                        display: "flex",
                        gap: "0.5rem",
                        // flexGrow: 2,
                        width: "12rem"
                    }}>

                        <TextField
                            size="small"
                            select
                            fullWidth
                            sx={{
                                height: "100%",
                                '& .MuiSelect-icon': {
                                    display: 'none',
                                },
                            }}
                            label="Priority"
                            // helperText="Please select your currency"
                        >
                            {PRIORITY.map((option) => (
                                <MenuItem sx={{
                                    display: "flex",
                                    height: "2rem"
                                }}
                                          key={option.value}
                                >
                                    <IconButton sx={{
                                        color: `${option.label}`,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}>
                                        <FlagIcon sx={{fontSize: "1.3rem"}}/>
                                    </IconButton>
                                    <Typography variant="subtitle1" sx={{color: theme.palette.common.black}}>
                                        {option.value}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            fullWidth
                            disabled={nameError}
                            size="small"
                            variant="contained"
                            sx={{
                                height: "100%"
                            }}
                            onClick={handleSaveTask}
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