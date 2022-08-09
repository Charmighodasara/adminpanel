import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getPatientsData = () => {
    return getRequest('Patients')
}

export const postPatientsData = (data) => {
    return postRequest('Patients', data)
}

export const deletePatientsData = (id) => {
    return deleteRequest('Patients/', id)
}

export const putPatientsData = (data) => {
    return putRequest('Patients/', data)
}