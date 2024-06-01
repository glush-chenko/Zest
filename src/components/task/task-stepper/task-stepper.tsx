import React from "react";
import Typography from "@mui/material/Typography";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {isStepOptional} from "../../../utils/is-step-optional";

interface TaskStep {
    index: number,
    name: string,
    completed: boolean,
}

interface TaskStepperProps {
    steps: TaskStep[];
    currentStep: number;
}


export const TaskStepper = (props: TaskStepperProps) => {
    const {steps, currentStep} = props;

    return (
        <Stepper
            orientation="vertical"
            activeStep={currentStep}
        >
            {steps.map((step, index) => {
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                    );
                }
                return (
                    <Step key={step.name} completed={step.completed}>
                        <StepLabel {...labelProps}>{step.name}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}