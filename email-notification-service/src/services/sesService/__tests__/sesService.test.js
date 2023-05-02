import sesService from '../sesService';
import SESException from '../../../exceptions/SESException';
import emailAuditService from '../../notification/emailAuditService';

jest.mock('../../../util/helpers');
jest.mock('@aws-sdk/client-ses', () => {
  const count = 0;
  class CustomError extends Error {
    constructor(name, RequestId, message, ...params) {
      super(...params);
      this.name = name;
      this.RequestId = RequestId;
      this.message = message;
    }
  }
  return {
    SESClient: jest.fn().mockImplementation(() => ({
      send: (data) => {
        if (data.type == 'SendTemplatedEmailCommand') {
          if (data.Source === null) {
            throw new CustomError(
              'MissingRequiredParameter',
              '1aaee205-fbbf-436f-881d-c98325c33807',
            );
          }
          if (data.Template === null) {
            throw new CustomError(
              'unknown error',
              '1aaee205-fbbf-436f-881d-c98325c33807',
            );
          }
          return new Promise((resolve) => resolve({
            $metadata: {
              requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
            },
          }));
        }
        if (data.type == 'TestRenderTemplateCommand') {
          if (data.TemplateName === null) {
            throw new CustomError(
              'MissingRequiredParameter',
              '1aaee205-fbbf-436f-881d-c98325c33807',
              'Unable to find <test_template> for <547712262172>',
            );
          }
          if (data.TemplateData === 'null') {
            throw new CustomError(
              'unknown error',
              '1aaee205-fbbf-436f-881d-c98325c33807',
            );
          }

          return new Promise((resolve) => resolve({
            $metadata: {
              requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
            },
          }));
        }
      },
    })),
    SendTemplatedEmailCommand: jest.fn().mockImplementation((param) => ({
      ...param,
      type: 'SendTemplatedEmailCommand',
    })),
    TestRenderTemplateCommand: jest.fn().mockImplementation((param) => ({
      ...param,
      type: 'TestRenderTemplateCommand',
    })),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('services: notificationService : pushNotification', () => {
  const sendNotificationSpy = jest.spyOn(sesService, 'sendNotification');
  const testRenderTemplateSpy = jest.spyOn(sesService, 'testRenderTemplate');
  test('pushNotification should return success status ', async () => {
    const templateData = {
      subject: 'abc abc Posting – Job Status',
      userEmail: 'test@user.com',
      dateTime: '06-02-2020 19:23:23',
      successOpcos: [],
      failedOpcos: [],
      agreementReportStatus: 'Completed ',
      obligationReportStatus: 'Completed ',
      failures: false,
    };
    emailAuditService.addEmailAuditEntry = jest.fn().mockResolvedValue(1);
    const templateDataJSONString = JSON.stringify(templateData);

    const jsonObj = {
      applicationName: 'report_scheduler',
      toAddresses: [],
      ccAddresses: [],
      bccAdresses: [],
      sourceEmail: 'abcAlerts@gmail.com',
      templateName: 'test_template_2',
      templateData: templateDataJSONString,
    };

    const response = await sesService.sendNotification(jsonObj);
    expect(sendNotificationSpy).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
      isSuccess: true,
    });
  });

  test('pushNotification should return missing params ', async () => {
    const templateData = {
      subject: 'abc abc Posting – Job Status',
      userEmail: 'test@user.com',
      dateTime: '06-02-2020 19:23:23',
      successOpcos: [],
      failedOpcos: [],
      agreementReportStatus: 'Completed ',
      obligationReportStatus: 'Completed ',
      failures: false,
    };
    emailAuditService.addEmailAuditEntry = jest.fn().mockResolvedValue(1);
    const templateDataJSONString = JSON.stringify(templateData);

    const jsonObj = {
      applicationName: 'report_scheduler',
      toAddresses: [],
      ccAddresses: [],
      bccAdresses: [],
      sourceEmail: null,
      templateName: 'test_template_2',
      templateData: templateDataJSONString,
    };

    const response = await sesService.sendNotification(jsonObj);
    expect(sendNotificationSpy).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: false,
    });
  });

  test('pushNotification should return SESException after 9 attempts ', async () => {
    const templateData = {
      subject: 'abc abc Posting – Job Status',
      userEmail: 'test@user.com',
      dateTime: '06-02-2020 19:23:23',
      successOpcos: [],
      failedOpcos: [],
      agreementReportStatus: 'Completed ',
      obligationReportStatus: 'Completed ',
      failures: false,
    };
    emailAuditService.addEmailAuditEntry = jest.fn().mockResolvedValue(1);
    const templateDataJSONString = JSON.stringify(templateData);

    const jsonObj = {
      applicationName: 'report_scheduler',
      toAddresses: [],
      ccAddresses: [],
      bccAdresses: [],
      sourceEmail: 'user@gmail.com',
      templateName: null,
      templateData: templateDataJSONString,
    };

    await expect(sesService.sendNotification(jsonObj)).rejects.toThrow(
      SESException,
    );
    expect(sendNotificationSpy).toHaveBeenCalledTimes(9);
  });
  test('testRenderTemplate should return success status ', async () => {
    const templateData = {
      subject: 'abc abc Posting – Job Status',
      userEmail: 'test@user.com',
      dateTime: '06-02-2020 19:23:23',
      successOpcos: [],
      failedOpcos: [],
      agreementReportStatus: 'Completed ',
      obligationReportStatus: 'Completed ',
      failures: false,
    };
    emailAuditService.addEmailAuditEntry = jest.fn().mockResolvedValue(1);
    const templateName = 'abc_posting_template';
    const templateDataJSONString = JSON.stringify(templateData);

    const response = await sesService.testRenderTemplate(
      templateName,
      templateDataJSONString,
    );
    expect(response).toStrictEqual({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
      isSuccess: true,
    });
  });
  test('testRenderTemplate should return missing params ', async () => {
    const templateData = {
      subject: 'abc abc Posting – Job Status',
      userEmail: 'test@user.com',
      dateTime: '06-02-2020 19:23:23',
      successOpcos: [],
      failedOpcos: [],
      agreementReportStatus: 'Completed ',
      obligationReportStatus: 'Completed ',
      failures: false,
    };
    emailAuditService.addEmailAuditEntry = jest.fn().mockResolvedValue(1);
    const templateName = null;
    const templateDataJSONString = JSON.stringify(templateData);

    const response = await sesService.testRenderTemplate(
      templateName,
      templateDataJSONString,
    );
    expect(response).toStrictEqual({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      message: 'Unable to find <test_template> for <547712262172>',
      isSuccess: false,
    });
  });
  test('testRenderTemplate should return unknown exception after 9 attempts', async () => {
    const templateData = null;
    const templateName = 'abc_posting';
    emailAuditService.addEmailAuditEntry = jest.fn().mockResolvedValue(1);
    await expect(
      sesService.testRenderTemplate(templateName, templateData),
    ).rejects.toThrow(SESException);

    expect(testRenderTemplateSpy).toHaveBeenCalledTimes(9);
  });
});
