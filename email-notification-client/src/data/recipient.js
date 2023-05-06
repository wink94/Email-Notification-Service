import axios from "axios";
import { BASE_URL } from "../config/constant";

export const getRecipients = async (recipientId = null) => {
  try {
    if (recipientId) {
      const response = await axios.get(
        `${BASE_URL}/notification/email/recipient/${recipientId}`
      );
      console.log(response);
      return response.data;
    }
    const response = await axios.get(
      `${BASE_URL}/notification/email/recipient`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteRecipients = async (recipientId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/notification/email/recipient/${recipientId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addRecipient = async (dataParams, action) => {
  try {
    if (action === "add") {
      const response = await axios.post(
        `${BASE_URL}/notification/email/recipient`,
        dataParams
      );
      console.log(response);
      return response.data;
    } else {
      const response = await axios.patch(
        `${BASE_URL}/notification/email/recipient/${dataParams.recipientId}`,
        dataParams
      );
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
