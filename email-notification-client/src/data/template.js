import axios from "axios";
import { BASE_URL } from "../config/constant";

export const getTemplate = async (templateId = null) => {
  try {
    if (templateId) {
      const response = await axios.get(
        `${BASE_URL}/notification/email/template/${templateId}`
      );
      console.log(response);
      return response.data;
    }
    const response = await axios.get(
      `${BASE_URL}/notification/email/template`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTemplate = async (templateId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/notification/email/template/${templateId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addtemplate = async (dataParams, action) => {
  try {
    if (action === "add") {
      const response = await axios.post(
        `${BASE_URL}/notification/email/template`,
        dataParams
      );
      console.log(response);
      return response.data;
    } else {
      const response = await axios.patch(
        `${BASE_URL}/notification/email/template/${dataParams.templateId}`,
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
