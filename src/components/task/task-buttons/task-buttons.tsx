import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {isStepOptional} from "../../../utils/is-step-optional";

interface TaskButtonsProps {
    onBack: () => void;
    onNext: () => void;
    onSkip: () => void;
    addTask: () => void;
    currentStep: number;
    isLastStep: boolean;
    disabledNext: boolean;
}

export const TaskButtons = (props: TaskButtonsProps) => {
    const {onBack, onNext, onSkip, addTask, isLastStep, currentStep, disabledNext} = props;

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "space-between"}}>
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
                    // <Snackbar
                    //     message="Task added successfully"
                    //     variant="success"
                    //     ButtonComponent={(
                    //         <Button onClick={addTask} disabled={disabledNext} variant="contained">
                    //             Add a task
                    //         </Button>
                        // )}
                    // />

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