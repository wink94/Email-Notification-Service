import axios from "axios";
import { BASE_URL } from "../config/constant";

export const getRecipients = async (accessToken, recipientId = null) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    if (recipientId) {
      const response = await axios.get(
        `${BASE_URL}/notification/email/recipient/${recipientId}`,
        config
      );
      console.log(response);
      return response.data;
    }
    const response = await axios.get(
      `${BASE_URL}/notification/email/recipient`,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteRecipients = async (recipientId, accessToken) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    const response = await axios.delete(
      `${BASE_URL}/notification/email/recipient/${recipientId}`,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addRecipient = async (dataParams, action, accessToken) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    if (action === "add") {
      const response = await axios.post(
        `${BASE_URL}/notification/email/recipient`,
        dataParams,
        config
      );
      console.log(response);
      return response.data;
    } else {
      const response = await axios.patch(
        `${BASE_URL}/notification/email/recipient/${dataParams.recipientId}`,
        dataParams,
        config
      );
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
