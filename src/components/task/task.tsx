import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {useAppSelector} from "../../app/hooks";
import {selectTasks} from "./task-slice";
import {TaskCardsList} from "./task-cards-list/task-cards-list";
import {TaskNameTextField} from "./task-name-text-field/task-name-text-field";
import {TaskStepper} from "./task-stepper/task-stepper";

export const isStepOptional = (step: number) => {
    return step === 1 || step === 2;
};

export const Task = () => {
    const {skipped} = useAppSelector(selectTasks);

    return (
        <Box sx={{width: '100%'}}>
            <TaskCardsList />
            <TaskStepper />
            <TaskNameTextField />
        </Box>
    )
}