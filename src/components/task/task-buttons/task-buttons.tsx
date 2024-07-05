import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {isStepOptional} from "../../../utils/is-step-optional";

interface TaskButtonsProps {
    /**
     * The current step in a multistep process.
     */
    currentStep: number;
    /**
     * A flag indicating whether the current step is the last one.
     */
    isLastStep: boolean;
    /**
     * A flag indicating whether the Next button should be disabled.
     */
    disabledNext: boolean;
    /**
     * Function called when the "Back" button is clicked.
     */
    onBack: () => void;
    /**
     * A function called when the "Next" button is clicked.
     */
    onNext: () => void;
    /**
     * Function called when the "Skip" button is clicked.
     */
    onSkip: () => void;
    /**
     * A function called when the "Add task" button is clicked.
     */
    addTask: () => void;
}

export const TaskButtons = (props: TaskButtonsProps) => {
    const {
        isLastStep,
        currentStep,
        disabledNext,
        onBack,
        onNext,
        onSkip,
        addTask,
    } = props;

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "space-between", width: "100%"}}>
            {currentStep > 0 && (
                <Button
                    color="inherit"
                    disabled={currentStep === 0}
                    onClick={onBack}
                    sx={{mr: 1}}
                >
                    Back
                </Button>
            )}
            <Box sx={{display: "flex", justifyContent: "flex-end", flexGrow: 1}}>
                {(isStepOptional(currentStep) && currentStep === 1) && (
                    <Button color="inherit" onClick={onSkip} sx={{mr: 1}} variant="outlined">
                        Skip
                    </Button>
                )}
                {isLastStep ? (
                    <Button onClick={addTask} disabled={disabledNext} variant="contained">
                        Add a task
                    </Button>
                ) : (
                    <Button onClick={onNext} disabled={disabledNext} variant="contained" color="primary">
                        Next
                    </Button>
                )}
            </Box>
        </Box>
    )
}