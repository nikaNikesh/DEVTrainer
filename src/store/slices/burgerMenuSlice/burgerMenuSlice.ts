import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    isVisible: boolean;
}

const initialState: initialStateType = { isVisible: true };

const burgerMenuSlice = createSlice({
    name: "burgerMenu",
    initialState,
    reducers: {
        toggleBurgerMenu: (state) => {
            state.isVisible = !state.isVisible;
        },
        closeBurgerMenu: (state) => {
            state.isVisible = false;
        }
    }
});

export default burgerMenuSlice.reducer;
export const { toggleBurgerMenu,
               closeBurgerMenu } = burgerMenuSlice.actions;