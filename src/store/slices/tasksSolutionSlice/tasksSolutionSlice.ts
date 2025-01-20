import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialStateType {
    [key: number]: string
}

const initialState: InitialStateType = {}


const tasksSolutionSlice = createSlice({
    name: "solutionsMap",
    initialState,
    reducers: {
        setSolution: (state: InitialStateType, action: PayloadAction<{key: number, value: string}>) => {
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        }
    }
});

export default tasksSolutionSlice.reducer;
export const {setSolution} = tasksSolutionSlice.actions;