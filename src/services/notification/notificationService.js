/** @format */

import recipientDao from '../../dao/recipientDao';
import templateDao from '../../dao/templateDao';
import sesService from '../sesService/sesService';

class NotificationService {
  async pushNotification(validatedDto) {
    const finalResponse = {
      isSuccess: true,
      payLoad: null,
    };

    if (
      validatedDto.toAddresses
      && validatedDto.ccAddresses
      && validatedDto.bccAddresses && validatedDto.template
    ) {
      const templateDataJSONString = JSON.stringify(validatedDto.templateData);

      const bccAddresses = validatedDto.bccAddresses || [];

      const jsonObj = {
        applicationName: validatedDto.applicationName,
        emailCategory: validatedDto.emailCategory,
        toAddresses: validatedDto.toAddresses,
        ccAddresses: validatedDto.ccAddresses,
        bccAddresses,
        sourceEmail: 'lkspade@gmail.com',
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
    } if (validatedDto.templateId && validatedDto.recipientId) {
      const recipientData = await recipientDao.getRecipient(validatedDto.recipientId);

      const templateData = await templateDao.getTemplate(validatedDto.templateId);

      const templateDataJSONString = JSON.stringify(validatedDto.templateData);

      const bccAddresses = recipientData[0].emailAddresses.bccAddresses || [];
      const jsonObj = {
        applicationName: validatedDto.applicationName,
        emailCategory: validatedDto.emailCategory,
        toAddresses: recipientData[0].emailAddresses.toAddresses,
        ccAddresses: recipientData[0].emailAddresses.ccAddresses,
        bccAddresses,
        sourceEmail: 'lkspade@gmail.com',
        templateName: templateData[0].templateName,
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

    finalResponse.isSuccess = false;
    return finalResponse;
  }
}
export default new NotificationService();
