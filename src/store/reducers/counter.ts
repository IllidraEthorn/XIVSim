import { Action } from "../actions";

const counterReducer = (state = 0, action: any) => {
    switch(action.type){
        case Action.DECREMENT:
            return state - 1;
        case Action.INCREMENT:
            return state + 1;
        default:
            return state;
    }
}

export default counterReducer