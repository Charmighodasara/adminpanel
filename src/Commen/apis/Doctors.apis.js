import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getDoctorsData = () => {
    return getRequest('Doctors')
}

export const postDoctorsData = (data) => {
    return postRequest('Doctors', data)
}

export const deleteDoctorsData = (id) => {
    return deleteRequest('Doctors/' , id)
}

export const putDoctorsData = (data) =>{
    return putRequest('Doctors/', data)
}