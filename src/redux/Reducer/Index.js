import { combineReducers } from "redux"
import { counterReducer } from "./Counter.reducer"
import { DoctoresReducer } from "./Doctores.reducer"
import { MedicineReducer } from "./Medicine.reducer"
import { patientsReducer } from "./Patients.reducer"

export const rootCounter = combineReducers({
    counter: counterReducer,
    medicine: MedicineReducer,
    patients : patientsReducer,
    doctors : DoctoresReducer,
})