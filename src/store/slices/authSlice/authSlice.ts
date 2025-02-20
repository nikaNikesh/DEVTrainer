import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import authService from "../../../service/authService";
import {AuthTokens} from "../../../service/authService";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                authService.pending,
                (state) => {
                    state.loading = true;

                }
            )

            .addCase(
                authService.fulfilled,
                (state, action: PayloadAction<AuthTokens>) => {
                    state.accessToken = action.payload.access_token;
                    state.refreshToken = action.payload.access_token;
                    state.loading = false;

                })

            .addCase(
                authService.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload ? action.payload : "Authentication error";
                }
            )
    }
});

export default authSlice.reducer;