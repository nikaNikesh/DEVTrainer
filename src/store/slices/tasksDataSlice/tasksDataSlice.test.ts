import reducer, {
    nextPage,
    prevPage,
    setDifficulty,
} from "./tasksDataSlice";

import getTasks from "../../../service/service";

const initialState = reducer(undefined, {type: ""});
describe('tasksDataSlice', () => {
    describe('reducers', () => {
        test('nextPage increases currentPage', () => {
            const state = reducer(initialState, nextPage());
            expect(state.currentPage).toBe(1);
        });

        test('prevPage decrements currentPage', () => {
            const newInitialState = {...initialState, currentPage: 3};
            const state = reducer(newInitialState, prevPage());
            expect(state.currentPage).toBe(2);
        });

        test('setDifficulty sets difficulty and resets currentPage', () => {
            const newInitialState = {...initialState, currentPage: 5};
            const state = reducer(newInitialState, setDifficulty('hard'));
            expect(state.difficulty).toBe("hard");
            expect(state.currentPage).toBe(0);
        });
    });

    describe('extraReducers', () => {
        const mockArg = {
            url: '',
            page: 5,
            size: 10
        };
        test('pending sets loading true and clears error', () => {
            const newInitialState = {...initialState, error: 'old error'};
            const state = reducer(newInitialState, getTasks.pending('', mockArg));
            expect(state.loading).toBe(true);
            expect(state.error).toBe(null);
        });

        test('fulfilled saves data and stops loading', () => {
            const payload = {
                content: [{
                    id: 1,
                    title: 'Task B',
                    difficulty: 'easy',
                    numberOfSolutions: 15,
                    descriptionOfTask: 'text'
                }],
                totalPages: 10,
                totalElements: 50,
                size: 5,
                number: 3
            };
            const state = reducer(initialState, getTasks.fulfilled(payload, '', mockArg));
            expect(state.loading).toBe(false);
            expect(state.currentPage).toBe(3);
            expect(state.totalPage).toBe(10);
            expect(state.entities[1]).toEqual(payload.content[0]);
        });

        test("rejected with payload sets custom error and loading false", () => {
            const payload = "Network error";
            const state = reducer(initialState, getTasks.rejected(null, '', mockArg, payload));
            expect(state.error).toBe("Network error");
            expect(state.loading).toBe(false);
        });

        test("rejected without payload sets default error and loading false", () => {
            const state = reducer(initialState, getTasks.rejected(null, '', mockArg, undefined));
            expect(state.error).toBe("Failed to load tasks");
            expect(state.loading).toBe(false);
        });
    });
});