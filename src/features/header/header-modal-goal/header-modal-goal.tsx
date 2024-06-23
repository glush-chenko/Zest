import React, {useCallback, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import {selectHeader, setGoalForDay} from "../header-slice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

interface HeaderModalGoalProps {
    text: string;
    onClose: () => void;
}

export const HeaderModalGoal = (props: HeaderModalGoalProps) => {
    const {text, onClose} = props;
    const dispatch = useAppDispatch();
    const {goalForDay} = useAppSelector(selectHeader);
    const [value, setValue] = React.useState(5);

    useEffect(() => {
        setValue(goalForDay);
    }, [goalForDay]);

    const handleSaveGoal = useCallback(() => {
        dispatch(setGoalForDay(value));
        onClose();
    }, [dispatch, value]);

    return (
        <Dialog
            open
            onClose={onClose}
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle>{text}</DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    // height: "10rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "1rem"

                    }}
                >
                    <TextField
                        type="number"
                        value={value}
                        sx={{
                            width: "10rem",
                        }}
                        onChange={(e) => setValue(parseInt(e.target.value) || 0)}
                        inputProps={{
                            style: {
                                height: '0.5rem',
                                fontSize: '1rem',
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "1rem"
                    }}
                >
                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleSaveGoal} variant="contained">Save</Button>
                </Box>
            </DialogContent>

        </Dialog>
    )
}