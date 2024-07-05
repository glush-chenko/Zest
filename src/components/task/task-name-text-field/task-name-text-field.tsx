import React from "react";
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
                maxWidth: "25rem",
                width: "100%",
                minHeight: "15rem",
                [theme.breakpoints.down('md')]: {
                    maxWidth: "20rem"
                },
                [theme.breakpoints.down('sm')]: {
                    maxWidth: "none"
                },
            }}
            >

                {currentStep === 0 && (
                    <TextField
                        multiline
                        autoFocus
                        required
                        label="Name"
                        fullWidth
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
                            width: "100%"
                        }}
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                border: 'none',
                                borderBottom: `1px solid lightgray`,
                                backgroundColor: "transparent",
                                width: "100%"
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "0.5rem",
                                    '&:last-child': {
                                        paddingBottom: 0,
                                    },
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    sx={{overflow: "hidden"}}
                                >
                                    {name}
                                </Typography>
                            </CardContent>
                        </Card>

                        <TextField
                            label="Description"
                            multiline
                            sx={{maxWidth: "20rem", width: "100%"}}
                            value={description}
                            variant="standard"
                            onChange={(e) => onDescriptionChange(e.target.value)}
                            inputProps={{
                                maxLength: 100,
                            }}
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
                            overflow: "hidden"
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                wordBreak: "break-word",
                                whiteSpace: "pre-wrap",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {name}
                        </Typography>
                        <Box sx={{border: "1px solid gray", width: "100%"}}/>
                        {description && (
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{wordBreak: "break-word"}}
                            >
                                {description}
                            </Typography>
                        )}

                        <Box
                            // flexDirection={{xs: 'column', md: 'row'}}
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="The input field"
                                    value={date}
                                    onChange={onDateChange}
                                    views={['day', 'month']}
                                    sx={{
                                        flex: 1.2,
                                        height: "100%",
                                        "& .MuiInputBase-input": {
                                            padding: "0.7rem",
                                            height: "100%"
                                        },
                                        "& .MuiInputBase-root": {
                                            height: "100%"
                                        }
                                    }}
                                />
                            </LocalizationProvider>

                            <TextField
                                value={priority}
                                size="medium"
                                select
                                sx={{
                                    width: "100%",
                                    flex: 1,
                                    '& .MuiSelect-icon': {
                                        display: 'none',
                                    },
                                    "& .MuiSelect-select.MuiSelect-outlined": {
                                        padding: "0.6rem",
                                        height: 0
                                    }
                                }}
                                onChange={(e) => onPriorityChange(e.target.value)}
                                label="Priority"
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
                                                minWidth: "2.2rem"
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
                    </Box>
                )}
            </Box>
        </>
    );
}