import * as Actiontypes from '../ActionType'

const initval = {
    isLoading: false,
    medicine: [],
    error: ''
}

export const MedicineReducer = (state = initval, action) => {
    console.log(action.payload);
    switch (action.type) {
        case Actiontypes.MEDICINE_GETDATA:
            return {
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: ''
            }
        case Actiontypes.LOADING_MEDICINES:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case Actiontypes.ERROR_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: [],
                error: action.payload
            }

        default:
            return state;
    }
}