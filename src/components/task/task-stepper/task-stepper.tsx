import React from "react";
import Typography from "@mui/material/Typography";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {isStepOptional} from "../task";
import {useAppSelector} from "../../../app/hooks";
import {selectTasks} from "../task-slice";

export const STEPS = ['Describe the name of the task', 'Description, if required', 'Period of execution'];

export const TaskStepper = () => {
    const {currentStep, skipped} = useAppSelector(selectTasks);

    const isStepSkipped = (step: number) => {
        return skipped.includes(step);
    };

    return (
        <Stepper
            orientation="vertical"
            activeStep={currentStep}
        >
            {STEPS.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                    );
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}