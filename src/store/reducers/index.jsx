import { combineReducers } from "redux";
import { machineReducer } from "./machineReducer";
import { machineTypeReducer } from "./machineTypeReducer";
import { machineFieldReducer } from "./machineFieldReducer";

const rootReducer = combineReducers({
    machineReducer,
    machineTypeReducer,
    machineFieldReducer
});

export default rootReducer;