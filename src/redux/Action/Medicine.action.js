import { BASE_URL } from '../../Base_url/Base_url';
import { deleteMedicinesData, getMedicinesData, postMedicinesData, putMedicinesData } from '../../Commen/apis/Medicines.api';
import * as Actiontypes from '../ActionType'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { async } from '@firebase/util';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getMedicines = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Medicine"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
        });

        dispatch({ type: Actiontypes.MEDICINE_GETDATA, payload: data })
        console.log(data);

    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const addMedicines = (data) => async (dispatch) => {
    console.log(data);
    try {
        const PatientsRef = ref(storage, 'Medicine/' + data.profile_img.name);

        uploadBytes(PatientsRef, data.profile_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Medicine"), {
                            ...data,
                            profile_img: url
                        });
                        dispatch({
                            type: Actiontypes.MEDICINE_ADDDATA, payload:
                            {
                                id: docRef.id,
                                ...data,
                                profile_img: url
                            }
                        })

                    })
            });
        // const docRef = await addDoc(collection(db, "Medicine"), data);
        // console.log("Document written with ID: ", docRef.id);
        // dispatch({ type: Actiontypes.MEDICINE_ADDDATA, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const deleteMedicines = (id) => async (dispatch) => {
    console.log(id);
    try {
        await deleteDoc(doc(db, "Medicine", id));
        dispatch({ type: Actiontypes.MEDICINE_DELETE, payload: id })
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const updateMedicines = (data) => async(dispatch) => {
    console.log(data);
    try {
        const washingtonRef = doc(db, "Medicine", data.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            expiry: data.expiry
        });
        dispatch({type : Actiontypes.MEDICINE_UPDATE , payload: data})
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