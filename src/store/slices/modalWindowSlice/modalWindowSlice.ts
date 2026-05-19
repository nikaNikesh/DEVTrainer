import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false,
};

const modalWindowSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export default modalWindowSlice.reducer;
export const {
    openModal,
    closeModal
} = modalWindowSlice.actions;

