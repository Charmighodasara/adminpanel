import { BASE_URL } from '../../Base_url/Base_url';
import { deleteMedicinesData, getMedicinesData, postMedicinesData, putMedicinesData } from '../../Commen/apis/Medicines.api';
import * as Actiontypes from '../ActionType'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { async } from '@firebase/util';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
        let rendomNumber = Math.floor(Math.random() * 10000).toString()
        console.log(rendomNumber);
        const MedicineRef = ref(storage, 'Medicine/' + rendomNumber);

        uploadBytes(MedicineRef, data.profile_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Medicine"), {
                            ...data,
                            profile_img: url,
                            fileName: rendomNumber
                        });
                        dispatch({
                            type: Actiontypes.MEDICINE_ADDDATA, payload:
                            {
                                id: docRef.id,
                                ...data,
                                profile_img: url,
                                fileName: rendomNumber
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

export const deleteMedicines = (data) => async (dispatch) => {

    try {
        console.log(data);

        const medicineRef = ref(storage, 'Medicine/' + data.fileName);
        deleteObject(medicineRef)
            .then(async () => {
                await deleteDoc(doc(db, "Medicine", data.id));
                dispatch({ type: Actiontypes.MEDICINE_DELETE, payload: data.id })
            }).catch((error) => {
                dispatch(errorMedicines(error.message))
            });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }

}

export const updateMedicines = (data) => async (dispatch) => {
    console.log(data);
    try {
        const medicineRef = doc(db, "Medicine", data.id);

        if (typeof data.profile_img === "string") {
            await updateDoc(medicineRef, {
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                expiry: data.expiry
            });
            dispatch({ type: Actiontypes.MEDICINE_UPDATE, payload: data })
        } else {

            const delMedicineRef = ref(storage, 'Medicine/' + data.fileName);
            let rendomNumber = Math.floor(Math.random() * 10000).toString()
            const insertMedicineRef = ref(storage, 'Medicine/' + rendomNumber);
            // 1
            deleteObject(delMedicineRef)
                .then(async () => {
                    uploadBytes(insertMedicineRef, data.profile_img)
                        .then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            getDownloadURL(ref(storage, snapshot.ref))
                                .then(async (url) => {
                                    console.log(url);
                                    await updateDoc(medicineRef, {
                                        name: data.name,
                                        price: data.price,
                                        quantity: data.quantity,
                                        expiry: data.expiry,
                                        fileName: rendomNumber,
                                        profile_img: url
                                    });
                                    dispatch({
                                        type: Actiontypes.MEDICINE_UPDATE, payload: {
                                            ...data,
                                            fileName: rendomNumber,
                                            profile_img: url
                                        }
                                    })

                                })
                        })
                })

        }

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