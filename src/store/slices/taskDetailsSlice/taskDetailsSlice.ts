import { createSlice, PayloadAction} from "@reduxjs/toolkit";

import getTaskById from "../../../service/taskService";

interface Task {
    id: number,
    title: string,
    difficulty: string,
    numberOfSolutions: number,
    descriptionOfTask: string
}

interface taskDetailsState {
    task: Task | null,
    loading: boolean,
    error: string | null
}

const initialState: taskDetailsState = {
    task: null,
    loading: false,
    error: null
};

const taskDetailsSlice = createSlice({
    name: 'taskDetails',
    initialState,
    reducers: {
        clearTaskDetailsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.task = action.payload;
            })

            .addCase(getTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload as string : "Failed to load task";
            })
    }
});

export const {
    clearTaskDetailsError,
} = taskDetailsSlice.actions;
export default taskDetailsSlice.reducer;