import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";

import {ERROR_MESSAGES} from "../../constants/errorMessages";


interface ServerResponse {
    success: boolean
}

interface Request {
    taskId: string,
    solution: string
}

const sendService = createAsyncThunk<
    ServerResponse,
    Request & { url: string },
    { rejectValue: string }
>(
    'solution/sendSolution',
    async ({url, taskId, solution}, {rejectWithValue}) => {

        try {
            const requestBody = {
                solution: solution
            }
            const response: AxiosResponse<ServerResponse> = await axios.post<ServerResponse>(
                `${url}/${taskId}/check`,
                requestBody,
                {withCredentials: true}
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && !error.response) {
                return rejectWithValue(
                    ERROR_MESSAGES.SERVER_NOT_RESPONDING
                );
            }

            return rejectWithValue(
                ERROR_MESSAGES.FAILED_TO_SEND_DATA
            );
        }

    }
);

export default sendService;