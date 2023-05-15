import axios from "axios";
import { BASE_URL } from "../config/constant";

export const getTemplate = async (accessToken, templateId = null) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    if (templateId) {
      const response = await axios.get(
        `${BASE_URL}/notification/email/template/${templateId}`,
        config
      );
      console.log(response);
      return response.data;
    }
    const response = await axios.get(
      `${BASE_URL}/notification/email/template`,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTemplate = async (templateId, accessToken) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    const response = await axios.delete(
      `${BASE_URL}/notification/email/template/${templateId}`,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addtemplate = async (dataParams, action, accessToken) => {
  try {
    const config = {
      headers: {
        authorization: accessToken,
      },
    };
    if (action === "add") {
      const response = await axios.post(
        `${BASE_URL}/notification/email/template`,
        dataParams,
        config
      );
      console.log(response);
      return response.data;
    } else {
      const response = await axios.patch(
        `${BASE_URL}/notification/email/template/${dataParams.templateId}`,
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
