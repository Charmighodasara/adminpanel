
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

        default:
           return state;
    }

}