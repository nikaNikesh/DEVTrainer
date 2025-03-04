import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse, AxiosError} from "axios";

interface AuthCredentials {
    username: string;
    email: string;
    password: string;
    role: string;
}

interface AuthPayload {
    url: string;
    credentials: AuthCredentials;
}

const ERROR_MESSAGES = {
    LOGIN_CONFLICT: "This login is already registered",
    SERVER_NOT_RESPONDING: "Server not responding - check your internet connection",
    UNEXPECTED_ERROR: "Unexpected error occurred",
};

const registerService = createAsyncThunk<
    void,
    AuthPayload,
    { rejectValue: string }
>(
    'authLogin',
    async ({url, credentials}, {rejectWithValue}) => {
        try {
            const response: AxiosResponse<void> = await axios.post(url, credentials);
            return;
        } catch (error) {

            if (axios.isAxiosError(error)) {

                if (!error.response) {
                    return rejectWithValue(ERROR_MESSAGES.SERVER_NOT_RESPONDING);
                }

                if (error.response.status === 409) {
                    return rejectWithValue(ERROR_MESSAGES.LOGIN_CONFLICT);
                }
            }
            return rejectWithValue(ERROR_MESSAGES.UNEXPECTED_ERROR);
        }
    }
);

export default registerService;

