import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export const tokenSlice = createSlice({
    name: 'screenSlice',
    initialState: {
        token: localStorage.getItem('todoist_access_token'),
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const { setToken} = tokenSlice.actions;
export const selectToken = (state: RootState) => state.tokenSlice.token;

export default tokenSlice.reducer;