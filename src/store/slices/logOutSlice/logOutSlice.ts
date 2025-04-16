import {createSlice} from "@reduxjs/toolkit";
import logOutService from "../../../service/logOutService";

interface AuthState {
    isLogOut: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLogOut: false,
    loading: false,
    error: null
}

const logOutSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     toggleIsLogOut: (state) => {
            state.isLogOut = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                logOutService.pending,
                (state) => {

                    state.loading = true;
                }
            )

            .addCase(
                logOutService.fulfilled,
                (state) => {

                    state.isLogOut = true;
                    state.loading = false;
                }
            )

            .addCase(
                logOutService.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload ? action.payload : "Unknown error during authentication";
                }
            )
    }
});

export const {
    toggleIsLogOut
} = logOutSlice.actions;
export default logOutSlice.reducer;