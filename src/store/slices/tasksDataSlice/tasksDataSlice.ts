import { createSlice, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import getTasks, { TasksData } from "../../../service/service";

interface Task {
    id: number,
    title: string,
    difficulty: string,
    numberOfSolutions: number,
    descriptionOfTask: string
}

const tasksAdapter = createEntityAdapter<Task>();

interface TaskState extends EntityState<Task, number> {
    currentPage: number,
    totalPage: number,
    difficulty: string,
    loading: boolean,
    error: string | null
}

const initialState: TaskState = tasksAdapter.getInitialState({
    currentPage: 0,
    totalPage: 0,
    difficulty: 'all',
    loading: false,
    error: null
});

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
            state.currentPage = 0;
        },
        clearTasksError: (state) => {
            state.error = null;
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
                state.currentPage = action.payload.number;
                state.totalPage = action.payload.totalPages;

                tasksAdapter.setAll(state, action.payload.content);
            })

            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload : "Failed to load tasks";
            })
    }
});

export const tasksSelectors = tasksAdapter.getSelectors<{
    tasksData: TaskState
}>((state) => state.tasksData);

export const {
    nextPage,
    prevPage,
    setDifficulty,
    clearTasksError,
} = tasksDataSlice.actions;
export default tasksDataSlice.reducer;