
import * as Actiontypes from '../ActionType'

const initVal = {
    isLoading: false,
    patients: [],
    error: ''

}

export const patientsReducer = (state = initVal, action) => {
    switch (action.type) {
        case Actiontypes.PATIENTS_GETDATA:
            return {
                ...state,
                isLoading: false,
                patients: action.payload,
                error: ''
            }
        case Actiontypes.LOADING_PATIENTS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case Actiontypes.ERROR_PATIENTS:
            return {
                ...state,
                isLoading: false,
                patients: [],
                error: action.payload
            }

        default:
            return state;
    }
}