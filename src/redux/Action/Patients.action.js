
import { BASE_URL } from '../../Base_url/Base_url';
import * as Actiontypes from '../ActionType'
import { patientsReducer } from '../Reducer/Patients.reducer';

export const getPatients = () => (dispatch) => {
    try {
        dispatch(loadingPatients())
        setTimeout(function () {

            fetch(BASE_URL + 'Patients')
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
                .then((data) => dispatch({ type: Actiontypes.PATIENTS_GETDATA, payload: data }))
                .catch((error) => dispatch(errorPatients(error.message)));
        }, 2000);

    } catch (error) {
        console.log(error);
    }
}

export const loadingPatients = () => (dispatch) => {
    dispatch({ type: Actiontypes.LOADING_PATIENTS })
}

export const errorPatients = (error)=> (dispatch)=> {
    dispatch({type : Actiontypes.ERROR_PATIENTS , payload : error})
}