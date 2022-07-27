
import * as ActionTypes from '../ActionType'

export const getDoctors = () => (dispatch) => {
    try {
        fetch('http://localhost:3004/Doctore')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.DOCTORS_GETDATA, payload: data }))
            .catch((error)=> console.log(error))
    } catch (error) {
        console.log(error);
    }

}
