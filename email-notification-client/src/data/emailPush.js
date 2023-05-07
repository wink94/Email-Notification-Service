import axios from 'axios'
import {BASE_URL} from '../config/constant'

export const getAllEmailAuditEntry = async () =>{
    try {
        const response = await axios.get(`${BASE_URL}/notification/email/push-notification`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return null
    }
  }


  export const pushEmailNotification = async (dataParams) =>{
    try {
        const response = await axios.post(`${BASE_URL}/notification/email/push-notification`,dataParams);
        console.log(response);
        return response.data
    } catch (error) {
        console.error(error);
        return null
    }
  }