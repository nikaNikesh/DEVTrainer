import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";


interface ServerResponse {
    status: string,
    message: string
}

interface RequestBody {
    id: string,
    solution: string
}

const sendService = createAsyncThunk<
    ServerResponse,
    RequestBody & { url: string },
    { rejectValue: string }
>(
    'solution/sendSolution',
    async ({url, id, solution}, {rejectWithValue}) => {

        try {
            const requestBody = {
                id: id,
                solution: solution
            }
            const response: AxiosResponse<ServerResponse> = await axios.post<ServerResponse>(
                url,
                requestBody,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any ) {
            return rejectWithValue(error.message || 'Failed to send data')
        }

    }
);

export default sendService;