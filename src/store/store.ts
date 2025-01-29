import {configureStore} from "@reduxjs/toolkit";
import tasksDataReducer from "./slices/tasksDataSlice";
import burgerMenuReducer from "./slices/burgerMenuSlice";
import tasksSolutionReducer from "./slices/tasksSolutionSlice";
import solutionReducer from "./slices/solutionResponseSlice";

const store = configureStore({
    reducer: {
        tasksData: tasksDataReducer,
        burgerMenu: burgerMenuReducer,
        tasksSolution: tasksSolutionReducer,
        serverResponse: solutionReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;