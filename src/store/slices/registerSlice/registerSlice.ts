import {createSlice} from "@reduxjs/toolkit";
import registerService from "../../../service/registerService";

interface AuthState {
    isRegistered: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isRegistered: false,
    loading: false,
    error: null
}

const registerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
         clearRegistrationError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                registerService.pending,
                (state) => {

                    state.loading = true;
                }
            )

            .addCase(
                registerService.fulfilled,
                (state) => {

                    state.isRegistered = true;
                    state.loading = false;
                }
            )

            .addCase(
                registerService.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload ? action.payload : "Unknown error during registration";
                }
            )
    }
});

export const { clearRegistrationError } = registerSlice.actions;
export default registerSlice.reducer;