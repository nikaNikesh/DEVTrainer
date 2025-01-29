import {createSlice} from "@reduxjs/toolkit";
import sendService from "../../../service/sendService";

interface ServerResponse {
    status: string | null,
    message: string | null
}

const initialState: ServerResponse = {
    status: null,
    message: null
}

const solutionResponseSlice = createSlice({
    name: 'serverResponse',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            sendService.rejected,
            (state, action) => {
                state.message = action.payload ? action.payload : "Failed to load tasks";
            }
        )
    }
});
export default solutionResponseSlice.reducer;