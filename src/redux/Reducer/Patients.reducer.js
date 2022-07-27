
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

        default:
            return state;
    }
}