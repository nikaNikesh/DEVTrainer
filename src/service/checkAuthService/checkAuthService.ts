import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {ERROR_MESSAGES} from "../../constants/errorMessages";

const CHECK_AUTH_URL = "https://localhost:8443/api/v1/auth/auth/check";

const checkAuthService = createAsyncThunk<
    boolean,
    void,
    { rejectValue: string }
>(
    "auth/check",
    async (_, { rejectWithValue }) => {
        try {
            await axios.get(CHECK_AUTH_URL, { withCredentials: true });
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    return rejectWithValue(ERROR_MESSAGES.SERVER_NOT_RESPONDING);
                }

                if (error.response.status === 401 || error.response.status === 403) {
                    return false;
                }
            }

            return rejectWithValue(ERROR_MESSAGES.UNEXPECTED_ERROR);
        }
    }
);

export default checkAuthService;
