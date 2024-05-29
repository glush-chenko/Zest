import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../app/store";
import dayjs, {Dayjs} from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    scheduledDate: string;
    // createdAt: string;
    // dayOfWeek: number;
}

interface TaskState {
    name: string;
    description: string;
    tempScheduledDate: string;
    currentStep: number;
    tasks: Task[];
    completedTasks: Task[];
    isTaskCreatorOpen: boolean;
    // selectedDate: string | null;
    // filteredTasksByDate: Task[];
    skipped: number[];
    selectedTask: Task | null;
}

const initialState: TaskState = {
    name: "",
    description: "",
    tempScheduledDate: `${dayjs().format('MM-DD')}`,
    currentStep: 0,
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    completedTasks: JSON.parse(localStorage.getItem('completedTasks') || '[]'),
    isTaskCreatorOpen: false,
    // selectedDate: dayjs().toISOString(),
    skipped: [],
    // filteredTasksByDate: [],
    selectedTask: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ step: number; value: string }>) => {
            if (action.payload.step === 0) {
                state.name = action.payload.value;
            } else {
                state.description = action.payload.value;
            }
        },
        nextStep: (state) => {
            state.currentStep = state.currentStep + 1;
        },
        prevStep: (state) => {
            state.currentStep = state.currentStep - 1;
        },
        resetStep: (state) => {
            state.currentStep = 0;
            state.name = "";
            state.description = "";
        },
        addTask: (state, action : PayloadAction<{scheduledDate: string}>) => {
            const newTask: Task = {
                id: uuidv4(),
                name: state.name,
                description: state.description,
                completed: false,
                scheduledDate: action.payload.scheduledDate,
                // createdAt: new Date().toDateString(),
                // dayOfWeek: new Date().getDay()
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
            state.name = '';
            state.description = '';
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        completeTask: (state, action: PayloadAction<string>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            if (taskIndex !== -1) {
                const completedTask = { ...state.tasks[taskIndex], completed: true };
                state.completedTasks.push(completedTask);
                state.tasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
                localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks));
            }
        },
        selectTask: (state, action: PayloadAction<string | null>) => {
            if (action.payload) {
                state.selectedTask = [...state.tasks, ...state.completedTasks].find((t) => t.id === action.payload) || null;
            } else {
                state.selectedTask = null;
            }
        },
        toggleTaskCreator: (state, action: PayloadAction<boolean>) => {
            state.isTaskCreatorOpen = action.payload;
        },
        setTempScheduledDate: (state, action: PayloadAction<string>) => {
            state.tempScheduledDate = action.payload;
        },
        // setTempScheduledDate: (state, action: PayloadAction<string>) => {
        //     state.
        // },
        // updateScheduledDate: (state, action: PayloadAction<{ scheduledDate: string }>) => {
        //     const task = state.tasks.find((t) => t.id === action.payload.id);
        //     if (task) {
        //         task.scheduledDate = action.payload.scheduledDate;
        //         localStorage.setItem('tasks', JSON.stringify(state.tasks));
        //     }
        // },
        // setSelectedDate: (state, action: PayloadAction<string | null>) => {
        //     state.selectedDate = action.payload;
        // },

        // filterTasksByDate: (state, action: PayloadAction<string | null>) => {
        //     const today = dayjs();
        //     if (action.payload === null) {
        //         state.filteredTasksByDate = state.tasks.filter((task) =>
        //             dayjs(task.createdAt).isSame(today, 'date')
        //         );
        //     } else {
        //         state.filteredTasksByDate = state.tasks.filter((task) =>
        //             dayjs(task.createdAt).isSame(action.payload, 'date')
        //         );
        //     }
        // },
        unskipStep: (state, action: PayloadAction<number>) => {
            const index = state.skipped.indexOf(action.payload);
            if (index !== -1) {
                state.skipped.splice(index, 1);
            }
        },
        addSkippedStep: (state, action: PayloadAction<number>) => {
            if (!state.skipped.includes(action.payload)) {
                state.skipped.push(action.payload);
            }
        },
        setCustomSkipped: (state, action: PayloadAction<number[]>) => {
            state.skipped = action.payload;
        },
    },
});

export const {
    updateField,
    prevStep,
    nextStep,
    addTask,
    removeTask,
    resetStep,
    completeTask,
    selectTask,
    toggleTaskCreator,
    setTempScheduledDate,
    // setSelectedDate,
    // filterTasksByDate,
    // updateScheduledDate,
    unskipStep,
    addSkippedStep,
    setCustomSkipped
} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.taskSlice;

// export const selectDate = (state: RootState) => state.taskSlice.selectedDate
//     ? dayjs(state.taskSlice.selectedDate)
//     : null;

// export const selectDateString = (state: RootState) => state.taskSlice.selectedDate;
// export const selectDate = createSelector(
//     selectDateString,
//     (dateString) => {
//         if (!dateString) return null;
//         return dayjs(dateString);
//     }
// );
export default taskSlice.reducer;