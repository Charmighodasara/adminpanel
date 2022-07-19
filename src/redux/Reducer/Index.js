import { combineReducers } from "redux"
import { counterReducer } from "./Counter.reducer"

export const rootCounter = combineReducers({
    counter: counterReducer
})