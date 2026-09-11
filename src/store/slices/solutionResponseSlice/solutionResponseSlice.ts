import { createSlice } from "@reduxjs/toolkit";

import sendService from "../../../service/sendService";

interface SolutionState {
    isSent: boolean;
    error: string | null;
}

const initialState: SolutionState = {
    isSent: false,
    error: null,
};

const solutionSlice = createSlice({
    name: "solution",
    initialState,
    reducers: {
        clearSolutionError: (state) => {
            state.error = null;
        },
        clearIsSent: (state) => {
            state.isSent = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendService.pending, (state) => {
                state.isSent = false;
                state.error = null;
            })
            .addCase(sendService.fulfilled, (state, action) => {
                state.isSent = action.payload.success;
            })
            .addCase(sendService.rejected, (state, action) => {
                state.isSent = false;
                state.error = action.payload ?? "Failed to send solution";
            });
    },
});

export const {
    clearSolutionError,
    clearIsSent,
} = solutionSlice.actions;

export default solutionSlice.reducer;