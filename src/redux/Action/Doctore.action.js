
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { BASE_URL } from '../../Base_url/Base_url'
import { deleteDoctorsData, getDoctorsData, postDoctorsData, putDoctorsData } from '../../Commen/apis/Doctors.apis'
import { db } from '../../firebase'
import * as ActionTypes from '../ActionType'

export const getDoctors = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Doctor"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({id:doc.id, ...doc.data()})
            console.log(`${doc.id} => ${doc.data()}`);
        });
        dispatch({type: ActionTypes.DOCTORS_GETDATA , payload: data })
        console.log(data);

    } catch (error) {
        dispatch(errorDoctors(error.message))
    }

}

export const addDoctors = (data) => async (dispatch) => {

    try {
        const docRef = await addDoc(collection(db, "Doctor"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionTypes.DOCTORS_ADDDATA, payload: { id: docRef.id, ...data } })

    } catch (error) {
        dispatch(errorDoctors(error.message))
    }

}

export const deleteDoctors = (id) => (dispatch) => {
    console.log(id);
    try {
        deleteDoctorsData(id)
            .then(dispatch({ type: ActionTypes.DOCTORS_DELETE, payload: id }))
            .catch((error) => { dispatch(errorDoctors(error.message)); });
        // fetch(BASE_URL + 'Doctors/' + id, {
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
        //     .then(dispatch({ type: ActionTypes.DOCTORS_DELETE, payload: id }))
        //     .catch((error) => {
        //         dispatch(errorDoctors(error.message));
        //     });
    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const updateDoctors = (data) => (dispatch) => {
    console.log(data);
    try {
        putDoctorsData(data)
            .then((data) => {
                dispatch({ type: ActionTypes.DOCTORS_UPDATE, payload: data.data });
            })
            .catch((error) => {
                dispatch(errorDoctors(error.message));
            });
        // fetch(BASE_URL + 'Doctors/' + data.id, {
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
        //         dispatch({ type: ActionTypes.DOCTORS_UPDATE, payload: data });
        //     })
        //     .catch((error) => {
        //         dispatch(errorDoctors(error.message));
        //     });

    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const loadingDoctors = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_DOCTORS })
}
export const errorDoctors = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_DOCTORS, payload: error })
}