import  * as Actiontypes from '../ActionType'

export const getMedicines = () => (dispatch) => {
    fetch('http://localhost:3004/medicines')
        .then((response) => response.json())
        .then((data) => dispatch({type : Actiontypes.MEDICINE_GETDATA, payload : data} ))
        .catch((error)=> console.log(error));   
}