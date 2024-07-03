import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Task} from "../components/task/task-slice";
import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';

interface ZestState {
    tasks: Task[],
    completedTasks: Task[],
    selectedActivityTask: Task | null,
    loading: boolean,
    error: string | null;
}

const initialState: ZestState = {
    tasks: JSON.parse(localStorage.getItem('todoist_tasks_api') || '[]'),
    completedTasks: JSON.parse(localStorage.getItem('todoist_completed_tasks_api') || '[]'),
    selectedActivityTask: null,
    loading: false,
    error: null
};

export const apiKey = localStorage.getItem('todoist_access_token');
let lastSyncToken = localStorage.getItem("lastSyncToken");

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: any, {getState, rejectWithValue}) => {
        try {
            const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-Id': uuidv4(),
                    'Authorization': `Bearer ${apiKey}`
                },
                cache: "no-cache",
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateTaskContent = createAsyncThunk(
    'tasks/updateTaskContent',
    async (data: { taskId: string, content: any }, {getState, rejectWithValue}) => {
        try {
            const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${data.taskId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-Id': uuidv4(),
                    'Authorization': `Bearer ${apiKey}`
                },
                cache: "no-cache",
                body: JSON.stringify(data.content)
            });

            if (!response.ok) {
                return rejectWithValue(await response.json());
            }

            const updatedTask = await response.json();
            return updatedTask;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const closeTask = createAsyncThunk(
    'tasks/closeTask',
    async (taskId: string, {getState, rejectWithValue}) => {
        try {
            const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}/close`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                },
                cache: "no-cache"
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                return rejectWithValue(errorData);
            }

            const closedTask = await response.json();
            return closedTask;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const reopenTaskSync = createAsyncThunk(
    "tasks/reopenTaskSync",
    async (taskId: string, {getState, rejectWithValue}) => {
        try {
            const response = await fetch('https://api.todoist.com/sync/v9/sync', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: "no-cache",
                body: JSON.stringify({
                    sync_token: lastSyncToken,
                    commands:
                        JSON.stringify([{
                            type: 'item_uncomplete',
                            uuid: uuidv4(),
                            args: {
                                id: taskId
                            }
                        }])
                })

            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error response:', errorData);
                return rejectWithValue({error: errorData});
            }

            const reopenedTask = await response.json();
            return reopenedTask;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteTaskSync = createAsyncThunk(
    "tasks/deleteTaskSync",
    async (taskId: string, {getState, rejectWithValue}) => {
        try {
            const response = await fetch('https://api.todoist.com/sync/v9/sync', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: "no-cache",
                body: JSON.stringify({
                    sync_token: lastSyncToken,
                    commands:
                        JSON.stringify([{
                            type: 'item_delete',
                            uuid: uuidv4(),
                            args: {
                                id: taskId
                            }
                        }])
                })

            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error response:', errorData);
                return rejectWithValue({error: errorData});
            }

            const reopenedTask = await response.json();
            return reopenedTask;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getCompletedTasks = createAsyncThunk(
    'todoist/getCompletedTodos',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch('https://api.todoist.com/sync/v9/completed/get_all', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
                cache: "no-cache"
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getActivityTaskById = createAsyncThunk(
    'todoist/getActivityTaskById',
    async (taskId: string, {getState, rejectWithValue}) => {
        try {
            const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                },
                cache: "no-cache"
            });

            if (!response.ok) {
                return rejectWithValue(await response.json());
            }

            const task = await response.json();
            return task;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const syncTodosLoadTasks = createAsyncThunk(
    'todoist/syncTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.todoist.com/sync/v9/sync', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                cache: "no-cache",
                body: JSON.stringify({
                    sync_token: '*',
                    resource_types: '["items"]'
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


const todoistSlice = createSlice({
    name: 'todoist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(syncTodosLoadTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(syncTodosLoadTasks.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.tasks = action.payload.items.map((task: any): Task => ({
                    id: task.id,
                    name: task.content,
                    description: task.description,
                    completed: false,
                    scheduledDate: task.due ? dayjs(task.due.date).startOf("day").valueOf() : null,
                    priority: `${task.priority}`,
                    // createdAt: task.created_at,
                    createdAt: task.added_at,
                    completedAt: task.completed_at,
                }));
                localStorage.setItem("lastSyncToken",  action.payload.sync_token);
            })
            .addCase(syncTodosLoadTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(getCompletedTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompletedTasks.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.completedTasks = action.payload.items.map((task: any): Task => ({
                    id: task.id,
                    name: task.content,
                    description: "",
                    completed: true,
                    priority: "1",
                    createdAt: null,
                    completedAt: task.completed_at,
                }));
            })
            .addCase(getCompletedTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(getActivityTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getActivityTaskById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.selectedActivityTask = {
                    id: action.payload.id,
                    name: action.payload.content,
                    description: action.payload.description,
                    completed: action.payload.is_completed,
                    scheduledDate: action.payload.due ? action.payload.due.date : null,
                    priority: `${action.payload.priority}`,
                    createdAt: action.payload.created_at,
                    completedAt: null,
                }
            })
            .addCase(getActivityTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(updateTaskContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskContent.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.tasks = state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return {
                            id: action.payload.id,
                            name: action.payload.content,
                            description: action.payload.description,
                            completed: action.payload.is_completed,
                            scheduledDate: action.payload.due ? action.payload.due.date : null,
                            priority: `${action.payload.priority}`,
                            createdAt: action.payload.created_at,
                            completedAt: null,
                        };
                    }
                    return task;
                })
            })
            .addCase(updateTaskContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            })
    }
})

export const selectTodoistTasks = (state: RootState) => state.todoistSlice.tasks;
export const selectTodoistCompletedTasks = (state: RootState) => state.todoistSlice.completedTasks;
export const selectTodoistSelectedActivityTask = (state: RootState) => state.todoistSlice.selectedActivityTask;
export const selectTodoistLoading = (state: RootState) => state.todoistSlice.loading;

export default todoistSlice.reducer;