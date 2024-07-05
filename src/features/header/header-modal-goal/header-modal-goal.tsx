import React, {useCallback, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import {selectHeader, setGoalForDay} from "../header-slice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useMediaQuery, useTheme} from "@mui/material";

interface HeaderModalGoalProps {
    text: string;
    onClose: () => void;
}

export const HeaderModalGoal = (props: HeaderModalGoalProps) => {
    const {text, onClose} = props;

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            fullWidth
            maxWidth="xs"
            sx={{
                "& .MuiPaper-root": {
                    gap: "1rem",
                    maxWidth: "20rem"
                }
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    [theme.breakpoints.down('md')]: {
                        fontSize: "1.2rem",
                        padding: "0.5rem 1rem"
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: "1rem",
                        padding: "0.5rem 1rem"
                    }
                }}
            >
                {text}
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    [theme.breakpoints.down('sm')]: {
                        padding: "1rem"
                    }
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "1rem",
                        [theme.breakpoints.down('sm')]: {
                            paddingTop: 0
                        }
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
                        justifyContent: "space-between",
                        gap: "1rem"
                    }}
                >
                    <Button onClick={onClose} variant="outlined" size={isMobile ? "small" : "medium"}>Cancel</Button>
                    <Button onClick={handleSaveGoal} variant="contained" size={isMobile ? "small" : "medium"}>Save</Button>
                </Box>
            </DialogContent>

        </Dialog>
    )
}