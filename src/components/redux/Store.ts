import {Action, createStore} from "redux";

export interface bank {
    account: number
}

let defaultState:bank = {
    account: 0
}

let reducer = (state = defaultState, action:any) => {
    if (action.type === "plus") {
        return {...state, account: state.account + action.payload }
    } else if (action.type === "minus") {
        return {...state, account: state.account - action.payload }
    }
    return state;
};
export const store = createStore(reducer);