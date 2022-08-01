
import * as ActionTypes from '../ActionType'

const initval = {
    isLoading: false,
    doctors: [],
    error: ''
}

export const DoctoresReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionTypes.DOCTORS_GETDATA:
            return {
                ...state,
                isLoading: false,
                doctors: action.payload,
                error: ''
            }
        case ActionTypes.ERROR_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: [],
                error: action.payload
            }
        case ActionTypes.DOCTORS_ADDDATA:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.concat(action.doctors),
                error:''
            }
        case ActionTypes.LOADING_DOCTORS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        default:
            return state;
    }

}