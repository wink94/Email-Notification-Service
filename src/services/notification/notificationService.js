/** @format */

import InvalidRequestException from '../../exceptions/InvalidRequestException';
import ajvErrorHandler from '../../util/ajvErrorHandler';
import sesService from '../sesService/sesService';

class NotificationService {
  async pushNotification(validatedDto) {
    const finalResponse = {
      isSuccess: true,
      payLoad: null,
    };
    const templateDataJSONString = JSON.stringify(validatedDto.templateData);

    const bccAddresses = validatedDto.bccAddresses || [];

    const jsonObj = {
      applicationName: validatedDto.applicationName,
      emailCategory: validatedDto.emailCategory,
      toAddresses: validatedDto.toAddresses,
      ccAddresses: validatedDto.ccAddresses,
      bccAddresses,
      sourceEmail: 'Alerts@abc.com',
      templateName: validatedDto.template,
      templateData: templateDataJSONString,
    };

    const response = await sesService.sendNotification(jsonObj);

    if (!response.isSuccess) {
      finalResponse.isSuccess = false;
      finalResponse.payLoad = response.code;
    } else {
      finalResponse.payLoad = response;
    }

    return finalResponse;
  }

  async testTemplate(data) {
    const validatedDto = { isValidTemplate: false, schema: {} };
    const finalResponse = {
      isSuccess: true,
      payLoad: null,
    };

    const { isValidTemplate, schema } = validatedDto;

    if (!isValidTemplate && schema) {
      throw new InvalidRequestException(ajvErrorHandler(schema));
    }
    const response = await sesService.testRenderTemplate(
      data.template,
      data.templateData,
    );

    if (!response.isSuccess) {
      finalResponse.isSuccess = false;
      finalResponse.payLoad = response.code;
    } else {
      finalResponse.message = 'Template is valid';
    }

    return finalResponse;
  }
}
export default new NotificationService();
