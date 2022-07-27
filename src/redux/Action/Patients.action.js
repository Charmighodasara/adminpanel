
import  * as Actiontypes from '../ActionType'

export const getPatients = () => (dispatch) => {
    try {
        fetch('http://localhost:3004/Patients')
            .then((response) => response.json())
            .then((data) => dispatch({type : Actiontypes.PATIENTS_GETDATA, payload : data} ))
            .catch((error)=> console.log(error));   
        
    } catch (error) {
        console.log(error);
    }
}