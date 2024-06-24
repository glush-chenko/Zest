import { TodoistApi } from "@doist/todoist-api-typescript"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface RedditState {
    tasks: [],
    loading: boolean,
    error: string | null;
}

const initialState: RedditState = {
    tasks: [],
    loading: false,
    error: null
};

// export const api = new TodoistApi("987419bef49851141a05a4e5e28878f91489c0b4");
const api = "987419bef49851141a05a4e5e28878f91489c0b4";

export const loadProjects = createAsyncThunk(
    'todoist/loadProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.todoist.com/rest/v2/projects', {
                headers: {
                    'Authorization': `Bearer ${api}`
                }
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

export const loadTasks = createAsyncThunk(
    'todoist/loadTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
                headers: {
                    'Authorization': `Bearer ${api}`
                }
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

// export const syncTodos = createAsyncThunk(
//     'todoist/syncTodos',
//     async (_, { rejectWithValue }) => {
//         try {
//             const config = {
//                 url: 'https://api.todoist.com/sync/v9/sync',
//                 method: 'post',
//                 headers: {
//                     'Authorization': `Bearer ${api}`
//                 },
//                 data: {
//                     sync_token: '*',
//                     resource_types: '["all"]'
//                 }
//             };
//
//             const response = await axios(config);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );

const todoistSlice = createSlice({
    name: 'todoist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadProjects.fulfilled, (state, action) => {
                state.loading = true;
                state.tasks = action.payload;
            })
            .addCase(loadProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            });
    }
})

export const selectTodoistTasks = (state: RootState) => state.todoistSlice.tasks;
export const selectTodoistLoading = (state: RootState) => state.todoistSlice.loading;

export default todoistSlice.reducer;

// export async function getTodoistProjects(apiToken: string): Promise<any[]> {
//     const response = await fetch('https://api.todoist.com/sync/v9/sync', {
//         headers: {
//             // 'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiToken}`,
//         },
//     });
//     return await response.json();
// }

// fetch('https://api.todoist.com/rest/v2/projects', {
//     headers: {
//         'Authorization': 'Bearer 987419bef49851141a05a4e5e28878f91489c0b4'
//     }
// })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         console.log('Response:', data);
//     })
//
// fetch('https://api.todoist.com/rest/v2/tasks', {
//     headers: {
//         'Authorization': 'Bearer 987419bef49851141a05a4e5e28878f91489c0b4'
//     }
// })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         console.log('Response:', data);
//     })


// const config = {
//     url: 'https://api.todoist.com/sync/v9/sync',
//     method: 'post',
//     headers: {
//         'Authorization': 'Bearer 987419bef49851141a05a4e5e28878f91489c0b4'
//     },
//     data: {
//         sync_token: '*',
//         resource_types: '["all"]'
//     }
// };
//
// axios(config)
//     .then(response => {
//         console.log('Status:', response.status);
//         console.log('Response:', response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });