
import { BASE_URL } from '../../Base_url/Base_url'
import * as ActionTypes from '../ActionType'

export const getDoctors = () => (dispatch) => {
    try {
        dispatch(loadingDoctors())

        setTimeout(function () {

            fetch(BASE_URL + 'Doctor')
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
                .then((data) => dispatch({ type: ActionTypes.DOCTORS_GETDATA, payload: data }))
                .catch((error) => dispatch(errorDoctors(error.message)))
        }, 2000)

    } catch (error) {
        dispatch(errorDoctors(error.message))
    }

}

export const addDoctors = (data) => (dispatch) => {
    try {
        fetch(BASE_URL + 'Doctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
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
            .then((data) => {
                dispatch({ type: ActionTypes.DOCTORS_ADDDATA, payload: data });
            })
            .catch((error) => {
                dispatch(errorDoctors(error.message));
            });
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }

}

export const loadingDoctors = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_DOCTORS })
}
export const errorDoctors = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_DOCTORS, payload: error })
}