import {
  SESClient
} from '@aws-sdk/client-ses';
import { SES_EXCEPTIONS } from '../../exceptions/exceptionCodes';
import SESException from '../../exceptions/SESException';
import { APPLICATION_NAME, CONFIG_SET, EMAIL_TYPE } from '../../util/constant';
import { sleep } from '../../util/helpers';
import logger from '../../util/logger';
import emailAuditService from '../notification/emailAuditService';

class SESService {
  constructor() {
    this.ses = new SESClient({ region: 'us-east-1' });
  }

  async sendNotification(event, attempt = 0) {
    try {
      const params = {
        Template: event.templateName,
        TemplateData: event.templateData,
        Destination: {
          ToAddresses: event.toAddresses,
          CcAddresses: event.ccAddresses,
          BccAddresses: event.bccAddresses,
        },

        Source: event.sourceEmail,
        ConfigurationSetName: CONFIG_SET,
        Tags: [
          {
            Name: APPLICATION_NAME /* required */,
            Value: event.applicationName /* required */,
          },
          {
            Name: EMAIL_TYPE /* required */,
            Value: event.emailCategory /* required */,
          },
          /* more items */
        ],
      };

      // const command = new SendTemplatedEmailCommand(params);
      // const response = await this.ses.send(command);

      const response = {
        requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
        isSuccess: true,
      };

      const auditData = {
        receivers: {
          ToAddresses: event.toAddresses,
          CcAddresses: event.ccAddresses,
          BccAddresses: event.bccAddresses,
        },
        subject: JSON.parse(event.templateData).subject,
        // sesRequestId: response.$metadata.requestId,
        sesRequestId: response.requestId,
      };
      await emailAuditService.addEmailAuditEntry(auditData);

      logger.info(response);
      return {
        requestId: auditData.sesRequestId,
        isSuccess: true,
      };
    } catch (error) {
      logger.error(error);
      const auditData = {
        receivers: {
          ToAddresses: event.toAddresses,
          CcAddresses: event.ccAddresses,
          BccAddresses: event.bccAddresses,
        },
        subject: JSON.parse(event.templateData).subject,
        sesRequestId: null,
        emailNotificationAuditPrimaryId: null,
      };
      await emailAuditService.addEmailAuditEntry(auditData);

      if (SES_EXCEPTIONS.includes(error.name)) {
        return {
          requestId: error.RequestId,
          isSuccess: false,
        };
      }
      if (attempt < 8) {
        const nextAttempt = attempt + 1;
        const waitTime = nextAttempt * 2 + Math.floor(Math.random() * 4);
        logger.info(
          `send notification, re-attempt ${nextAttempt}, Retry in ${waitTime} seconds`,
        );
        await sleep(waitTime * 1000);
        return this.sendNotification(event, nextAttempt);
      }
      throw new SESException(error);
    }
  }

  async testRenderTemplate(template, templateData, attempt = 0) {
    try {
      const params = {
        TemplateName: template /* required */,
        TemplateData: JSON.stringify(templateData) /* required */,
      };
      // const command = new TestRenderTemplateCommand(params);
      // const response = await this.ses.send(command);
      logger.info(response);
      return {
        requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
        isSuccess: true,
      };
    } catch (error) {
      logger.error(error);
      if (SES_EXCEPTIONS.includes(error.name)) {
        return {
          requestId: error.RequestId,
          isSuccess: false,
          message: error.message,
        };
      }
      if (attempt < 8) {
        const nextAttempt = attempt + 1;
        const waitTime = nextAttempt * 2 + Math.floor(Math.random() * 4);
        logger.info(
          `render template, re-attempt ${nextAttempt}, Retry in ${waitTime} seconds`,
        );
        await sleep(waitTime * 1000);
        return this.testRenderTemplate(template, templateData, nextAttempt);
      }
      throw new SESException(error);
    }
  }
}

export default new SESService();
