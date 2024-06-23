import React, {useCallback, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    selectTasks,
    selectTask,
    addTask,
} from "../task-slice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TaskNameTextField} from "../task-name-text-field/task-name-text-field";
import {TaskButtons} from "../task-buttons/task-buttons";
import {useNavigate} from "react-router-dom";
import {TaskStepper} from "../task-stepper/task-stepper";
import dayjs, {Dayjs} from "dayjs";
import {useTheme} from "@mui/material";

export const TaskModal = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const {tasks, newTaskId} = useAppSelector(selectTasks);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [steps, setSteps] = React.useState(
        [
        {
            index: 0,
            name: 'Describe the name of the task',
            completed: false
        },
        {
            index: 1,
            name: 'Description, if required',
            completed: false
        },
        {
            index: 2,
            name: 'Period of execution',
            completed: false
        }
    ]);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [nameError, setNameError] = React.useState<boolean>(false);
    const [selectedPriority, setSelectedPriority] = React.useState("Priority 4");


    const handleNameChange = useCallback((name: string) => {
        setNameError(name.trim() === "");
        setName(name);
    }, []);

    const handleDescriptionChange = useCallback((description: string) => {
        setDescription(description);
    }, []);

    const handleDateChange = useCallback((date: Dayjs | null) => {
        setDate(date);
    }, []);

    const handlePriorityChange = useCallback((priority: string) => {
        setSelectedPriority(priority);
    }, []);

    const handleClose = useCallback(() => {
        dispatch(selectTask(null));
        tasks.length ? navigate('/tasks') : navigate('/');
    }, [dispatch, navigate, tasks]);

    const handleBack = useCallback(() => {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        setSteps(steps.map((step) => {
            if (step.index === currentStep) {
                step.completed = false;
            }
            return step;
        }))
    }, [currentStep]);

    const handleNext = useCallback(() => {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        setSteps(steps.map((step) => {
            if (step.index === currentStep) {
                step.completed = true;
            }
            return step;
        }))
    }, [currentStep]);

    const handleSkip = useCallback(() => {
        setCurrentStep((prevValue) => prevValue + 1);
    }, []);

    const handleAddTask = useCallback(() => {
        dispatch(addTask({
            name,
            description,
            date: date ? date.startOf('day').valueOf() : dayjs().startOf('day').valueOf(),
            priority: selectedPriority,
        }));

        
        navigate('/tasks');
    }, [dispatch, name, description, date, newTaskId, selectedPriority]);

    const disableNextButton = useMemo(() => {
        return currentStep === 0 && name.trim() === '';
    }, [currentStep, name]);

    return (
        <Dialog
            open
            onClose={handleClose}
            fullWidth={true}
            maxWidth='md'
        >
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
            }}
            >
                Create Task
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5rem",
                    padding: "0 3rem",
            }}
            >
                <TaskStepper steps={steps} currentStep={currentStep}/>
                <TaskNameTextField
                    currentStep={currentStep}
                    name={name}
                    description={description}
                    date={date}
                    nameError={nameError}
                    priority={selectedPriority}
                    onNameChange={handleNameChange}
                    onDateChange={handleDateChange}
                    onDescriptionChange={handleDescriptionChange}
                    onPriorityChange={handlePriorityChange}
                />
            </DialogContent>

            <DialogActions>
                <TaskButtons
                    onBack={handleBack}
                    onNext={handleNext}
                    onSkip={handleSkip}
                    addTask={handleAddTask}
                    currentStep={currentStep}
                    isLastStep={currentStep === steps.length - 1}
                    disabledNext={disableNextButton}
                />
            </DialogActions>
        </Dialog>
    );
}