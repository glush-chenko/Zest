import React from "react";
import Typography from "@mui/material/Typography";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {isStepOptional} from "../../../utils/is-step-optional";
import {useAppSelector} from "../../../app/hooks";
import {selectScreenSizes} from "../../../features/screen-slice";
import {useTheme} from "@mui/material";

interface TaskStep {
    /**
     * The index of the step (starting from 0).
     */
    index: number,
    /**
     * The name or title of the step.
     */
    name: string,
    /**
     * A flag indicating whether the step has been completed.
     */
    completed: boolean,
}

interface TaskStepperProps {
    /**
     * An array of `TaskStep` objects representing the steps in the stepper.
     */
    steps: TaskStep[];
    /**
     * The index of the currently active step (starting from 0).
     */
    currentStep: number;
}


export const TaskStepper = (props: TaskStepperProps) => {
    const {steps, currentStep} = props;
    const theme = useTheme();

    const screenSizes = useAppSelector(selectScreenSizes);

    return (
        <Stepper
            orientation={screenSizes.isSmall ? "horizontal" : "vertical"}
            activeStep={currentStep}
            sx={{
                paddingTop: "2.5rem",
                [theme.breakpoints.down('sm')]: {
                    paddingTop: "1.5rem"
                },
            }}
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
                        <StepLabel
                            {...labelProps}
                            sx={{
                                maxWidth: screenSizes.isSmall ? "8rem" : "none",
                                [theme.breakpoints.down('sm')]: {
                                    flexDirection: "column",
                                    gap: "0.5rem"
                                },
                            }}
                        >
                            {step.name}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}