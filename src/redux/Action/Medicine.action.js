import { BASE_URL } from '../../Base_url/Base_url';
import { deleteMedicinesData, getMedicinesData, postMedicinesData, putMedicinesData } from '../../Commen/apis/Medicines.api';
import * as Actiontypes from '../ActionType'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { async } from '@firebase/util';

export const getMedicines = () => async(dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Medicine"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({id :doc.id , ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
        });

        dispatch({type : Actiontypes.MEDICINE_GETDATA , payload: data})
        console.log(data);

    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const addMedicines = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "Medicine"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: Actiontypes.MEDICINE_ADDDATA, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const deleteMedicines = (id) => (dispatch) => {
    console.log(id);
    try {
        deleteMedicinesData(id)
            .then(dispatch({ type: Actiontypes.MEDICINE_DELETE, payload: id }))
            .catch((error) => {
                dispatch(errorMedicines(error.message));
            });
        // fetch(BASE_URL + 'medicines/' + id, {
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
        //     .then(dispatch({ type: Actiontypes.MEDICINE_DELETE, payload: id }))
        //     .catch((error) => {
        //         dispatch(errorMedicines(error.message));
        //     });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const updateMedicines = (data) => (dispatch) => {
    console.log(data);
    try {
        putMedicinesData(data)
            .then((data) => dispatch({ type: Actiontypes.MEDICINE_UPDATE, payload: data.data }))
            .catch((error) => {
                dispatch(errorMedicines(error.message));
            });
        // fetch(BASE_URL + 'medicines/' + data.id, {
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
        //     .then((data) => dispatch({ type: Actiontypes.MEDICINE_UPDATE, payload: data }))
        //     .catch((error) => {
        //         dispatch(errorMedicines(error.message));
        //     });
    } catch (error) {
        dispatch(errorMedicines(error.message));
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: Actiontypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type: Actiontypes.ERROR_MEDICINES, payload: error })
}