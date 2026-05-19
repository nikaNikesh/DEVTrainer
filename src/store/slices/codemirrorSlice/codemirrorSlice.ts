import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
    language: string;
}

const initialState: initialStateType = { language: 'javascript' };

const codemirrorSlice = createSlice({
    name: "codemirror",
    initialState,
    reducers: {
        onChangeLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    }
});

export default codemirrorSlice.reducer;
export const { onChangeLanguage } = codemirrorSlice.actions;