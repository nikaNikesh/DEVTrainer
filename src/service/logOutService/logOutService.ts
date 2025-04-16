import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";


const ERROR_MESSAGES = {
    UNAUTHORIZED: "Unauthorized access",
    SERVER_NOT_RESPONDING: "Server not responding - check your internet connection",
    UNEXPECTED_ERROR: "Unexpected error occurred",
};

const logOutService = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>(
    'auth/logOut',
    async (url, {rejectWithValue}) => {
        try {
            const response: AxiosResponse<void> = await axios.get(url, {
  withCredentials: true
});
            return;
        } catch (error) {

            if (axios.isAxiosError(error)) {

                if (!error.response) {
                    return rejectWithValue(ERROR_MESSAGES.SERVER_NOT_RESPONDING);
                }

                if (error.response.status === 401) {
                    return rejectWithValue(ERROR_MESSAGES.UNAUTHORIZED);
                }

                return rejectWithValue(ERROR_MESSAGES.UNEXPECTED_ERROR);
            }
        }
    }
);

export default logOutService;

