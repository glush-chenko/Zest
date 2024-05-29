import React, {useCallback, useMemo} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {isStepOptional, STEPS} from "../task";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    addSkippedStep,
    addTask,
    nextStep,
    prevStep,
    resetStep,
    selectTasks,
    setCustomSkipped, setTempScheduledDate, toggleTaskCreator,
    unskipStep
} from "../task-slice";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

export const TaskButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {name, description, currentStep, skipped, tempScheduledDate} = useAppSelector(selectTasks);

    const isStepSkipped = (step: number) => {
        return skipped.includes(step);
    };

    const handleBack = useCallback(() => {
        dispatch(prevStep());
    }, [dispatch]);

    const handleSkip = useCallback(() => {
        if (!isStepOptional(currentStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        dispatch(nextStep());
        dispatch(addSkippedStep(currentStep))
    }, [dispatch, currentStep]);

    const handleAddTask = useCallback(() => {
        dispatch(addTask({scheduledDate: tempScheduledDate}));
        dispatch(resetStep());
        dispatch(toggleTaskCreator(false));
        dispatch(setTempScheduledDate(''));
        navigate('/tasks');
    }, [dispatch, tempScheduledDate]);

    const buttonsDisabled = useMemo(() => {
        return currentStep === 0 && name.trim() === '';
    }, [currentStep, name]);

    const handleNext = useCallback(() => {
        let newSkipped = [...skipped];

        if (isStepSkipped(currentStep)) {
            const index = newSkipped.indexOf(currentStep);
            if (index !== 1) {
                // newSkipped = new Set(newSkipped.values());
                newSkipped.splice(index, 1);
                dispatch(unskipStep(currentStep));
            }
        }

        dispatch(nextStep());
        dispatch(setCustomSkipped(newSkipped));
    }, [dispatch, currentStep, isStepSkipped]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "space-between"}}>
            {currentStep > 0 && (
                <Button
                    color="inherit"
                    disabled={currentStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1}}
                >
                    Back
                </Button>
            )}
            <Box sx={{display: "flex", justifyContent: "flex-end", flexGrow: 1}}>
                {(isStepOptional(currentStep) && currentStep === 1) && (
                    <Button color="inherit" onClick={handleSkip} sx={{mr: 1}} variant="outlined">
                        Skip
                    </Button>
                )}
                {currentStep === STEPS.length - 1 ? (
                    <Button onClick={handleAddTask} disabled={buttonsDisabled} variant="contained">
                        Add a task
                    </Button>
                ) : (
                    <Button onClick={handleNext} disabled={buttonsDisabled} variant="contained" color="primary">
                        Next
                    </Button>
                )}
            </Box>
        </Box>
    )
}