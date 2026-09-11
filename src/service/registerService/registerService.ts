import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {ERROR_MESSAGES} from "../../constants/errorMessages";

interface AuthCredentials {
    username: string;
    login: string;
    password: string;
}

interface AuthPayload {
    url: string;
    credentials: AuthCredentials;
}

const registerService = createAsyncThunk<
    void,
    AuthPayload,
    { rejectValue: string }
>(
    'auth/register',
    async ({url, credentials}, {rejectWithValue}) => {
        try {
            const payload = {
                username: credentials.username,
                email: credentials.login,
                password: credentials.password,
            };

            await axios.post(url, payload, {
                withCredentials: true
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (!error.response) {
                    return rejectWithValue(ERROR_MESSAGES.SERVER_NOT_RESPONDING);
                }

                if (error.response.status === 409) {
                    return rejectWithValue(ERROR_MESSAGES.LOGIN_ALREADY_REGISTERED);
                }
            }
            return rejectWithValue(ERROR_MESSAGES.UNEXPECTED_ERROR);
        }
    }
);

export default registerService;

