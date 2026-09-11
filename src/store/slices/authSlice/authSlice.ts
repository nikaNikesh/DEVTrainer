import {createSlice} from "@reduxjs/toolkit";
import authService from "../../../service/authService";
import checkAuthService from "../../../service/checkAuthService";

interface AuthState {
    isAuth: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuth: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
        toggleIsAuth: (state) => {
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authService.fulfilled, (state) => {
                state.isAuth = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(authService.rejected, (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.error = action.payload ? action.payload : "Unknown error during authentication";
            })

            .addCase(checkAuthService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthService.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = action.payload;
                state.error = null;
            })
            .addCase(checkAuthService.rejected, (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.error = action.payload ? action.payload : "Check auth failed";
            });
    }
});

export const {
    clearAuthError,
    toggleIsAuth
} = authSlice.actions;
export default authSlice.reducer;