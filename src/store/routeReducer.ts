import { combineReducers } from "redux";
import counterReducer from "./reducers/counter";
import journeyReducer from "./reducers/journey";

const routeReducer = combineReducers({
    counter: counterReducer,
    journey: journeyReducer
});

export default routeReducer;
