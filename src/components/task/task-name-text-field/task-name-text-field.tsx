import React, {ChangeEvent, useCallback, useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    selectTasks, setTempScheduledDate,
    updateField
} from "../task-slice";
import dayjs, {Dayjs} from "dayjs";
import {TaskButton} from "../task-button/task-button";

export const TaskNameTextField = () => {
    const dispatch = useAppDispatch();
    const {name, description, currentStep, tempScheduledDate} = useAppSelector(selectTasks);
    // const selectedDate = useAppSelector(selectDate);
    const [nameError, setNameError] = React.useState<boolean>(false);
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
    // const [tempScheduledDate, setTempScheduledDate] = React.useState<string>('');

    const handleTextFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, step: number) => {
        setNameError(event.target.value.trim() === "");
        dispatch(updateField({step, name: event.target.value}));
    }, [dispatch]);

    const handleDateChange = useCallback((value: Dayjs | null) => {
        setSelectedDate(value);
        // setTempScheduledDate(value?.format('YYYY-MM-DD') || '');

        dispatch(setTempScheduledDate(value?.format('MM-DD') || ''));

        // if (value) {
        //     dispatch(setTempScheduledDate(value?.format('YYYY-MM-DD') || ''));
        // }

        // dispatch(updateScheduledDate({scheduledDate: value.toString()}));
        //
    }, [dispatch]);

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: "center", paddingTop: "2rem"}}>

                {currentStep === 0 && (
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        label="The input field"
                        sx={{width: "25rem"}}
                        error={nameError}
                        value={name}
                        onChange={(e) => handleTextFieldChange(e, 0)}
                        helperText={name.trim() === "" ? 'This field is required' : ''}
                        variant="standard"
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
                            label="The input field"
                            multiline
                            rows={2}
                            sx={{width: "20rem"}}
                            value={description}
                            onChange={(e) => handleTextFieldChange(e, 1)}
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
                                value={selectedDate}
                                onChange={handleDateChange}
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