import axios, {AxiosResponse} from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface TasksData {
    content: {
        id: string,
        title: string,
        difficulty: string,
        numberOfSolutions: number
    }[],
    totalPages: number,
    totalElements: number,
    size: number,
    number: number
}

interface TasksRequestBody {
    page: number,
    size: number,
    difficulty?: string,
    title?: string,
    numberOfSolutions?: number
}

const getTasks = createAsyncThunk<
    TasksData,
    TasksRequestBody & { url: string },
    { rejectValue: string }
>(
    'tasks/fetchTasks',
    async ({url, page, size, difficulty, title, numberOfSolutions}, {rejectWithValue}) => {
        try {
            let tasksRequestBody: TasksRequestBody = {
                page: page,
                size: size
            };

            if (difficulty && difficulty !== 'all') {
                tasksRequestBody.difficulty = difficulty.toUpperCase();
            }

            if (title) {
                tasksRequestBody.title = title;
            }

            if (numberOfSolutions) {
                tasksRequestBody.numberOfSolutions = numberOfSolutions;
            }

            const response: AxiosResponse<TasksData> = await axios.post<TasksData>(
                url,
                tasksRequestBody
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load tasks')
        }
    }
);

export default getTasks;

