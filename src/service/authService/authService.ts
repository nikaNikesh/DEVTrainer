import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";

interface AuthCredentials {
    login: string;
    password: string;
}

interface AuthPayload {
    url: string;
    credentials: AuthCredentials;
}

const ERROR_MESSAGES = {
    UNAUTHORIZED: "Incorrect login or password",
    SERVER_NOT_RESPONDING: "Server not responding - check your internet connection",
    UNEXPECTED_ERROR: "Unexpected error occurred",
};

const authService = createAsyncThunk<
    void,
    AuthPayload,
    { rejectValue: string }
>(
    'auth/login',
    async ({url, credentials}, {rejectWithValue}) => {
        try {
            const response: AxiosResponse<void> = await axios.post(url, credentials, {
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

export default authService;

