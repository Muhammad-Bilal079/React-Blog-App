import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    satus: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.satus = true;
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            state.satus = false;
            state.userData = null;
        }
    }
})
export const { login, logout } = authSlice.actions

export default authSlice.reducer;