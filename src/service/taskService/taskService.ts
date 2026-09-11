import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {ERROR_MESSAGES} from "../../constants/errorMessages";

interface Task {
    id: number,
    title: string,
    difficulty: string,
    numberOfSolutions: number,
    descriptionOfTask: string
}

const GET_TASK_BY_ID_URL = "https://localhost:8443/api/v1/tasks";

const getTaskById = createAsyncThunk<
    Task,
    number,
    { rejectValue: string }
>(
    "tasks/fetchById",
    async (taskId: number, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Task> = await axios.get(
                `${GET_TASK_BY_ID_URL}/${taskId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    return rejectWithValue(ERROR_MESSAGES.SERVER_NOT_RESPONDING);
                }

                if (error.response.status === 401) {
                    return rejectWithValue(ERROR_MESSAGES.UNAUTHORIZED);
                }

                if (error.response.status === 403) {
                    return rejectWithValue(ERROR_MESSAGES.FORBIDDEN);
                }
            }
            return rejectWithValue(ERROR_MESSAGES.UNEXPECTED_ERROR);
        }
    }
);

export default getTaskById;
