import React, {ChangeEvent, useCallback, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {Dayjs} from "dayjs";
import {selectTasks, setTempScheduledDate, Task, updateField, updateTask} from "../../task-slice";
import FlagIcon from '@mui/icons-material/Flag';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

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
    selected: Task | null;
}

export const TaskCardEdit = (props: TaskCardEditProps) => {
    const dispatch = useAppDispatch();
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
    const {selected} = props;

    const handleDateChange = useCallback((value: Dayjs | null) => {
        setSelectedDate(value);
        if (value) {
            dispatch(updateField({name: "", scheduledDate: value.format('MM-DD')}))
        }
    }, [dispatch]);

    const handleTextFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(updateField({name: event.target.value}));
    }, [dispatch]);

    const handleDescriptionFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(updateField({description: event.target.value, name: ""}));
    }, [dispatch]);

    const handleSaveNameTask = useCallback(() => {
        dispatch(updateTask({
            id: selected && selected.id,
            name: selected && selected.name,
            description: selected && selected.description,
            scheduledDate: selected && selected.scheduledDate,
        }))
    }, [dispatch, selected]);

    return (
        <Card variant="outlined"
              sx={{
                  // border: '1px solid green',
                  // borderBottom: `1px solid lightgray`,
              }}
        >
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
            }}>
                <TextField
                    autoFocus
                    multiline
                    sx={{
                        width: "30rem",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            overflowWrap: 'break-word',
                        },
                    }}
                    value={selected?.name}
                    variant="outlined"
                    onChange={(e) => handleTextFieldChange(e)}
                />

                <TextField
                    multiline
                    sx={{
                        width: "30rem",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            overflowWrap: 'break-word',
                        },
                    }}
                    value={selected?.description ? selected.description : ""}
                    onChange={(e) => handleDescriptionFieldChange(e)}
                />

                <Box sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between"
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{
                                alignItems: "flex-start",
                                display: "flex",
                                width: "30%"
                            }}
                            value={selectedDate}
                            onChange={handleDateChange}
                            views={['day', 'month']}
                        />
                    </LocalizationProvider>

                    <TextField
                        select
                        sx={{
                            width: "30%",
                            '& .MuiSelect-icon': {
                                display: 'none',
                            },
                            // '& .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu': {
                            //     paddingRight: 24,
                            // },
                        }}
                        label="Priority"
                        // helperText="Please select your currency"
                    >
                        {PRIORITY.map((option) => (
                            <MenuItem sx={{
                                display: "flex",
                                gap: "1rem",
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
                                <Typography variant="subtitle1" sx={{color: "black"}}>
                                    {option.value}
                                </Typography>
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        sx={{width: "30%"}}
                        onClick={handleSaveNameTask}
                    >
                        Save
                    </Button>
                </Box>

            </CardContent>
        </Card>
    )
        ;
}