import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../app/store";
import dayjs, {Dayjs} from 'dayjs';
import {v4 as uuidv4} from 'uuid';

export interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    scheduledDate: number;
}

interface TaskState {
    tasks: Task[];
    selectedTask: Task | null;
}

const initialState: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    selectedTask: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateTask: (state, action: PayloadAction<{
            id: string,
            name: string,
            description: string,
            scheduledDate: number
        }>) => {
            const {name, description, scheduledDate } = action.payload;

            const updatedTasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        name: name,
                        description: description,
                        scheduledDate: scheduledDate,
                    };
                }
                return task;
            });
            state.tasks = updatedTasks;

            localStorage.removeItem('tasks');
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        },
        addTask: (state, action: PayloadAction<{name: string, description: string, date: number}>) => {
            const newTask: Task = {
                id: uuidv4(),
                name: action.payload.name,
                description:  action.payload.description,
                completed: false,
                scheduledDate: action.payload.date,
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        completeTask: (state, action: PayloadAction<string>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].completed = true;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        selectTask: (state, action: PayloadAction<string | null>) => {
            if (action.payload) {
                state.selectedTask = state.tasks.find((task) => task.id === action.payload) || null;
            } else {
                state.selectedTask = null;
            }
        },
    },
});

export const {
    addTask,
    removeTask,
    completeTask,
    selectTask,
    updateTask,
} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.taskSlice;

export default taskSlice.reducer;