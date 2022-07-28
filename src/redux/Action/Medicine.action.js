import { BASE_URL } from '../../Base_url/Base_url';
import * as Actiontypes from '../ActionType'

export const getMedicines = () => (dispatch) => {
    try {
        dispatch(loadingMedicines())

        setTimeout(function () {
            fetch(BASE_URL + 'medicines')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: Actiontypes.MEDICINE_GETDATA, payload: data }))
                .catch((error) => dispatch(errorMedicines(error.message)));
        }, 2000)

    } catch (error) {
        console.log(error);
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: Actiontypes.LOADING_MEDICINES })
}

export const errorMedicines = (error)=> (dispatch)=> {
    dispatch({type: Actiontypes.ERROR_MEDICINES , payload:error})
}