import { combineReducers } from "redux"
import { counter } from "./Counter.reducer"

export const rootReducer = combineReducers({
    counter: counter
})