import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updationStart: (state) => {
            state.isFetching = true;
        },
        updationSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        updationFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
        }
    },
})

export const { loginStart, loginSuccess, loginFailure,updationStart, updationSuccess, updationFailure , logout} = userSlice.actions
export default userSlice.reducer