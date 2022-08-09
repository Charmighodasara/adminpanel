
import { BASE_URL } from '../../Base_url/Base_url';
import { deletePatientsData, getPatientsData, postPatientsData, putPatientsData } from '../../Commen/apis/Patients.api';
import * as Actiontypes from '../ActionType'
import { patientsReducer } from '../Reducer/Patients.reducer';

export const getPatients = () => (dispatch) => {
    try {
        dispatch(loadingPatients())
        setTimeout(function () {
            getPatientsData()
                .then((data) => dispatch({ type: Actiontypes.PATIENTS_GETDATA, payload: data.data }))
                .catch((error) => dispatch(errorPatients(error.message)));
            // fetch(BASE_URL + 'Patients')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then((response) => response.json())
            //     .then((data) => dispatch({ type: Actiontypes.PATIENTS_GETDATA, payload: data }))
            //     .catch((error) => dispatch(errorPatients(error.message)));
        }, 2000);

    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const addPatients = (data) => (dispatch) => {
    try {
        postPatientsData(data)
            .then((data) => {
                dispatch({ type: Actiontypes.PATIENTS_ADDDATA, payload: data.data });
            })
            .catch((error) => {
                dispatch(errorPatients(error.message));
            });
        // fetch(BASE_URL + 'Patients', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: Actiontypes.PATIENTS_ADDDATA, payload: data });
        //     })
        //     .catch((error) => {
        //         dispatch(errorPatients(error.message));
        //     });
    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const deletePatients = (id) => (dispatch) => {
    console.log(id);
    try {
        deletePatientsData(id)
            .then(dispatch({ type: Actiontypes.PATIENTS_DELETE, payload: id }))
            .catch((error) => {
                dispatch(errorPatients(error.message));
            });
        // fetch(BASE_URL + 'Patients/' + id, {
        //     method: 'DELETE'
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then(dispatch({ type: Actiontypes.PATIENTS_DELETE, payload: id }))
        //     .catch((error) => {
        //         dispatch(errorPatients(error.message));
        //     });

    } catch (error) {
        dispatch(errorPatients(error.message));
    }
}

export const updatePatients = (data) => (dispatch) => {
    console.log(data);
    try {
        putPatientsData(data)
            .then((data) => {
                dispatch({ type: Actiontypes.PATIENTS_UPDATE, payload: data.data });
            })
            .catch((error) => {
                dispatch(errorPatients(error.message));
            });
        // fetch(BASE_URL + 'Patients/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: Actiontypes.PATIENTS_UPDATE, payload: data });
        //     })
        //     .catch((error) => {
        //         dispatch(errorPatients(error.message));
        //     });

    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const loadingPatients = () => (dispatch) => {
    dispatch({ type: Actiontypes.LOADING_PATIENTS })
}

export const errorPatients = (error) => (dispatch) => {
    dispatch({ type: Actiontypes.ERROR_PATIENTS, payload: error })
}