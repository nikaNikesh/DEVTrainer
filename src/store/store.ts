import {configureStore} from "@reduxjs/toolkit";
import tasksDataReducer from "./slices/tasksDataSlice";
import burgerMenuReducer from "./slices/burgerMenuSlice";
import solutionReducer from "./slices/solutionResponseSlice";
import authReducer from "./slices/authSlice";
import registrationReducer from "./slices/registerSlice";
import modalWindowReducer from "./slices/modalWindowSlice";
import logOutReducer from "./slices/logOutSlice";

const store = configureStore({
    reducer: {
        tasksData: tasksDataReducer,
        burgerMenu: burgerMenuReducer,
        serverResponse: solutionReducer,
        auth: authReducer,
        registration: registrationReducer,
        modalWindow: modalWindowReducer,
        logOut: logOutReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;