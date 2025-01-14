import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import getTasks, {TasksData} from "../../../service/service";

interface Task {
    id: string,
    title: string,
    difficulty: string,
    numberOfSolutions: number
}

interface TaskState {
    dataTask: Task[],
    currentPage: number,
    totalPage: number,
    difficulty: string,
    loading: boolean,
    error: string | null
}

const initialState: TaskState = {
    dataTask: [],
    currentPage: 0,
    totalPage: 0,
    difficulty: 'all',
    loading: false,
    error: null
}

const tasksDataSlice = createSlice({
    name: 'tasksData',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1;
        },
        prevPage: (state) => {
            state.currentPage -= 1;
        },
        setDifficulty: (state, action: PayloadAction<string>) => {
            state.difficulty = action.payload;
            state.currentPage = initialState.currentPage;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getTasks.fulfilled, (state, action: PayloadAction<TasksData>) => {
                state.loading = false;
                state.dataTask = action.payload.content;
                state.currentPage = action.payload.number;
                state.totalPage = action.payload.totalPages;
            })

            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload: "Failed to load tasks";
            })
    }
});

export const {
    nextPage,
    prevPage,
    setDifficulty
} = tasksDataSlice.actions;
export default tasksDataSlice.reducer;