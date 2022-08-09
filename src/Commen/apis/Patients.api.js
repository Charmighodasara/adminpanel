import { getRequest, postRequest } from "../Request"

export const getPatientsData = () => {
    return getRequest('Patients')
}