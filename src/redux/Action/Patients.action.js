
import { BASE_URL } from '../../Base_url/Base_url';
import { deletePatientsData, getPatientsData, postPatientsData, putPatientsData } from '../../Commen/apis/Patients.api';
import * as Actiontypes from '../ActionType'
import { patientsReducer } from '../Reducer/Patients.reducer';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { async } from '@firebase/util';

export const getPatients = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Patients"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
        });
        console.log(data);
        dispatch({ type: Actiontypes.PATIENTS_GETDATA, payload: data })

    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const addPatients = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "Patients"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: Actiontypes.PATIENTS_ADDDATA, payload: { id: docRef.id, ...data } })

    } catch (error) {
        dispatch(errorPatients(error.message))
    }
}

export const deletePatients = (id) => async (dispatch) => {
    console.log(id);
    try {
        await deleteDoc(doc(db, "Patients", id));
        dispatch({ type: Actiontypes.PATIENTS_DELETE, payload: id })
    } catch (error) {
        dispatch(errorPatients(error.message));
    }
}

export const updatePatients = (data) => async(dispatch) => {
    console.log(data);
    try {
        const PatientsRef = doc(db, "Patients", data.id);

        await updateDoc(PatientsRef, {
            name: data.name,
            age: data.age,
            phone: data.phone,
            city: data.city,
        });
        dispatch({type : Actiontypes.PATIENTS_UPDATE , payload :  data})
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