
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { BASE_URL } from '../../Base_url/Base_url'
import { deleteDoctorsData, getDoctorsData, postDoctorsData, putDoctorsData } from '../../Commen/apis/Doctors.apis'
import { db } from '../../firebase'
import * as ActionTypes from '../ActionType'

export const getDoctors = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Doctor"));
        let data = []

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
        });

        dispatch({ type: ActionTypes.DOCTORS_GETDATA, payload: data })
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

export const deleteDoctors = (id) => async (dispatch) => {
    console.log(id);
    try {
        await deleteDoc(doc(db, "Doctor", id));
        dispatch({ type: ActionTypes.DOCTORS_DELETE, payload: id })

    } catch (error) {
        dispatch(errorDoctors(error.message));
    }
}

export const updateDoctors = (data) => async (dispatch) => {
    console.log(data);
    try {
        console.log(data);
        const DoctorRef = doc(db, "Doctor", data.id);
    
        // Set the "capital" field of the city 'DC'
        await updateDoc(DoctorRef, {
            fname: data.fname,
            lname: data.lname,
            specialty: data.specialty
        });
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