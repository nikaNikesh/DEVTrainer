import {configureStore} from "@reduxjs/toolkit";
import tasksDataReducer from "./slices/tasksDataSlice";
import burgerMenuReducer from "./slices/burgerMenuSlice";
import tasksSolutionReducer from "./slices/tasksSolutionSlice";

const store = configureStore({
    reducer: {
        tasksData: tasksDataReducer,
        burgerMenu: burgerMenuReducer,
        tasksSolution: tasksSolutionReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;