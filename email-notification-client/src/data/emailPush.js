import axios from "axios";
import { BASE_URL } from "../config/constant";



export const getAllEmailAuditEntry = async (accessToken) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/notification/email/push-notification`,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const pushEmailNotification = async (dataParams, accessToken) => {
  try {
        const config = {
          headers: {
            authorization: accessToken,
          },
        };
    const response = await axios.post(
      `${BASE_URL}/notification/email/push-notification`,
      dataParams,config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
