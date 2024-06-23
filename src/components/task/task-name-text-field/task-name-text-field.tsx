import React, {ChangeEvent} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Dayjs} from "dayjs";
import {useTheme} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FlagIcon from "@mui/icons-material/Flag";
import {PRIORITY} from "../task-cards-list/task-card-edit/task-card-edit";

interface TaskNameTextFieldProps {
    currentStep: number;
    name: string;
    description: string;
    date: Dayjs | null;
    nameError: boolean;
    priority: string;
    onNameChange: (name: string) => void;
    onDescriptionChange: (description: string) => void;
    onDateChange: (date: Dayjs | null) => void;
    onPriorityChange: (priority: string) => void;
}

export const TaskNameTextField = (props: TaskNameTextFieldProps) => {
    const {
        currentStep,
        name,
        description,
        date,
        nameError,
        priority,
        onNameChange,
        onDescriptionChange,
        onDateChange,
        onPriorityChange
    } = props;
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                marginTop: "2rem",
                padding: "0.5rem 0.5rem",
                border: theme.palette.mode === "dark" ? `2px solid ${theme.palette.secondary.light}` : `2px solid ${theme.palette.grey[500]}`,
                borderRadius: "1.5rem",
                width: "25rem",
            }}
            >

                {currentStep === 0 && (
                    <TextField
                        multiline
                        autoFocus
                        required
                        label="Name"
                        sx={{width: "20rem"}}
                        error={nameError}
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        helperText={name.trim() === "" ? 'This field is required' : ''}
                        variant="standard"
                        inputProps={{
                            maxLength: 100,
                        }}
                    />
                )}

                {currentStep === 1 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1.5rem",
                        }}
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                border: 'none',
                                borderBottom: `1px solid lightgray`,
                                backgroundColor: "transparent"
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: 285,
                                    padding: "0.5rem",
                                    '&:last-child': {
                                        paddingBottom: 0,
                                    },
                                }}
                            >
                                <Typography variant="subtitle1" gutterBottom>{name}</Typography>
                            </CardContent>
                        </Card>

                        <TextField
                            label="Description"
                            multiline
                            // rows={2}
                            sx={{minWidth: "20rem"}}
                            value={description}
                            variant="standard"
                            onChange={(e) => onDescriptionChange(e.target.value)}
                        />
                    </Box>
                )}

                {currentStep === 2 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                        >
                            {name}
                        </Typography>
                        <Box sx={{border: "1px solid gray", width: "100%"}}/>
                        {description && <Typography variant="body1" gutterBottom>{description}</Typography>}

                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center"
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="The input field"
                                    value={date}
                                    onChange={onDateChange}
                                    views={['day', 'month']}
                                    sx={{
                                        flex: 1,
                                    }}
                                />
                            </LocalizationProvider>

                            <TextField
                                value={priority}
                                size="medium"
                                select
                                sx={{
                                    flex: 1,
                                    '& .MuiSelect-icon': {
                                        display: 'none',
                                    },
                                }}
                                onChange={(e) => onPriorityChange(e.target.value)}
                                label="Priority"
                            >
                                {PRIORITY.map((option) => (
                                    <MenuItem
                                        sx={{
                                            display: "flex",
                                            // height: "2rem",
                                        }}
                                        value={option.value}
                                        key={option.value}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "0.5rem",
                                                width: "2rem"
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
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}