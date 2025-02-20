import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";

export interface AuthTokens {
    access_token: string,
    refresh_token: string
}

interface AuthCredentials {
    email: string;
    password: string;
    username?: string;
    role?: string
}

const authService = createAsyncThunk<
        AuthTokens,
        { url: string, credentials: AuthCredentials },
        { rejectValue: string }
        >(
        'authLogin',
        async ({url, credentials}, { rejectWithValue }) => {
            try {
                const response: AxiosResponse<AuthTokens> = await axios.post<AuthTokens>(url, credentials);
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.message || 'Authentication error');
            }
        }
    );

export default authService;

