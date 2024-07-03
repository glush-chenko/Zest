import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";

interface TaskCardEditTextFieldProps {
    name: string;
    description: string;
    nameError: boolean;
    completed: boolean | null;
    onTextFieldChange: (text: string) => void;
    onDescriptionFieldChange: (description: string) => void;
}
export const TaskCardEditTextField = (props: TaskCardEditTextFieldProps) => {
    const theme = useTheme();
    const {name, description, nameError, completed, onTextFieldChange, onDescriptionFieldChange} = props;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                flex: 1,
                border: theme.palette.mode === "light" ? `1px solid ${theme.palette.common.black}` : `1px solid ${theme.palette.common.white}`,
                borderRadius: "1rem",
                padding: "1rem 1rem 0 1rem",
            }}>
            <TextField
                autoFocus
                multiline
                fullWidth
                sx={{
                    border: "none",
                    '& .MuiOutlinedInput-input': {
                        overflowWrap: 'break-word',
                    },
                    '& .MuiInputBase-root .Mui-disabled': {
                        textDecoration: 'line-through',
                    },
                }}
                value={name}
                variant="standard"
                onChange={(e) => onTextFieldChange(e.target.value)}
                error={nameError}
                helperText={nameError ? "The field must be filled in" : ""}
                inputProps={{
                    maxLength: 100,
                }}
                label="Name"
                disabled={completed ? completed : undefined}
            />

            <TextField
                multiline
                variant="standard"
                fullWidth
                sx={{
                    border: 'none',
                    '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'transparent',
                    },
                    '&:hover .MuiInput-underline:before': {
                        borderBottomColor: 'transparent',
                    },
                    '&:hover .MuiInput-underline:after': {
                        borderBottomColor: 'transparent',
                    },
                }}
                value={description}
                onChange={(e) => onDescriptionFieldChange(e.target.value)}
                label="Description"
                disabled={completed ? completed : undefined}
            />
        </Box>
    )
}