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
    priority: string;
    createdAt: number;
    completedAt?: number | null;
}

export interface TaskState {
    tasks: Task[];
    selectedTask: Task | null;
    newTaskId: string | null;
    editingTaskId: string | null;
}

const initialState: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    selectedTask: null,
    newTaskId: "",
    editingTaskId: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateTask: (state, action: PayloadAction<{
            id: string,
            name: string,
            description: string,
            scheduledDate: number,
            priority: string
        }>) => {
            const {name, description, scheduledDate, priority} = action.payload;

            const updatedTasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        name,
                        description,
                        scheduledDate,
                        priority,
                    };
                }
                return task;
            });
            state.tasks = updatedTasks;

            localStorage.removeItem('tasks');
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        },
        addTask: (state, action: PayloadAction<{
            name: string,
            description: string,
            date: number,
            priority: string,
        }>) => {
            const newTask: Task = {
                id: uuidv4(),
                name: action.payload.name,
                description: action.payload.description,
                completed: false,
                scheduledDate: action.payload.date,
                priority: action.payload.priority,
                createdAt: Date.now(),
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
            state.newTaskId = newTask.id;
        },
        setNewTaskId: (state, action: PayloadAction<string | null>) => {
            state.newTaskId = action.payload;
        },
        setEditingTaskId: (state, action: PayloadAction<string | null>) => {
            state.editingTaskId = action.payload;
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        completeTask: (state, action: PayloadAction<string>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].completed = true;
                state.tasks[taskIndex].completedAt = Date.now();
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        uncompleteTask: (state, action: PayloadAction<string>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].completed = false;
                state.tasks[taskIndex].completedAt = null;
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
    setNewTaskId,
    setEditingTaskId,
    completeTask,
    uncompleteTask,
    selectTask,
    updateTask,
} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.taskSlice;
export const selectActiveTasks = (state: RootState) => state.taskSlice.tasks.filter((task) => !task.completed);
export const selectCompletedTasks = (state: RootState) => state.taskSlice.tasks.filter((task) => task.completed);

export default taskSlice.reducer;