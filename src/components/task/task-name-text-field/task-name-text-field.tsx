import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useAppDispatch} from "../../../app/hooks";
import {Dayjs} from "dayjs";

interface TaskNameTextFieldProps {
    currentStep: number;
    name: string;
    description: string;
    date: Dayjs | null;
    nameError: boolean;
    onNameChange: (name: string) => void;
    onDescriptionChange: (description: string) => void;
    onDateChange: (date: Dayjs | null) => void;
}

export const TaskNameTextField = (props: TaskNameTextFieldProps) => {
    const {currentStep, name, description, onDescriptionChange, onNameChange, onDateChange, date, nameError} = props;

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: "center", paddingTop: "2rem"}}>

                {currentStep === 0 && (
                    <TextField
                        multiline
                        autoFocus
                        required
                        fullWidth
                        label="Name"
                        sx={{width: "25rem"}}
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
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem"}}>
                        <Card variant="outlined">
                            <CardContent sx={{width: 285, display: "flex", justifyContent: "center"}}>
                                <Typography variant="subtitle2" gutterBottom>{name}</Typography>
                            </CardContent>
                        </Card>

                        <TextField
                            label="Description"
                            multiline
                            rows={2}
                            sx={{width: "20rem"}}
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                        />
                    </Box>
                )}

                {currentStep === 2 && (
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem"}}>
                        <Typography variant="subtitle2">{name}</Typography>
                        {description && <Typography variant="body2" gutterBottom>{description}</Typography>}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="The input field"
                                value={date}
                                onChange={onDateChange}
                                views={['day', 'month']}
                            />
                        </LocalizationProvider>
                    </Box>
                )}
            </Box>

            {/*<TaskButton />*/}
        </>
    );
}