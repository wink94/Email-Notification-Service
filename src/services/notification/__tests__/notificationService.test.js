import InvalidRequestException from '../../../exceptions/InvalidRequestException';
import SESException from '../../../exceptions/SESException';
import notificationService from '../../../services/notification/notificationService';
import sesService from '../../sesService/sesService';
import * as sesServiceRequestDTO from '../../../dto/sesService/sesServiceRequestDTO';

jest.mock('../../../services/sesService/sesService');
beforeEach(() => {
  jest.clearAllMocks();
});
describe('services: notificationService : pushNotification', () => {
  test('pushNotification should return success status ', async () => {
    sesService.sendNotification = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: true,
    });
    const jsonBody = {
      applicationName: 'crms_gl_posting_ms',
      emailCategory: 'gl_report',
      template: 'test_template_2',
      templateData: {
        subject: 'CRMS GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementReportStatus: 'Completed ',
        obligationReportStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      toAddresses: ['sachith.rangana@syscolabs.com'],
      ccAddresses: [],
      bccAddresses: [],
    };

    const response = await notificationService.pushNotification(jsonBody);
    expect(response).toStrictEqual({
      isSuccess: true,
      payLoad: {
        requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
        isSuccess: true,
      },
    });
  });

  test('pushNotification should return success status Rebate report ', async () => {
    sesService.sendNotification = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: true,
    });
    const jsonBody = {
      applicationName: 'crms_gl_posting_ms',
      emailCategory: 'gl_report',
      template: 'crms_scheduled_rebate_report',
      templateData: {
        subject: 'CRMS Rebate Reports',
        agreementId: '100000065',
        agreementDescription: 'cakeadmin2 sd',
        reportToDate: '3/31/2021',
        reportFromDate: '3/1/2021',
        reportUrl:
          'http://REBATE_REPORT/SCHEDULED/202109/ReportSchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx',
      },
      toAddresses: ['sachith.rangana@syscolabs.com'],
      ccAddresses: [],
    };

    const response = await notificationService.pushNotification(jsonBody);
    expect(response).toStrictEqual({
      isSuccess: true,
      payLoad: {
        requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
        isSuccess: true,
      },
    });
  });


  test('pushNotification should return success status for rebate report notification ', async () => {
    sesService.sendNotification = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: true,
    });
    const jsonBody = {
      applicationName: 'crms_reporting_ms',
      emailCategory: 'gl_report',
      template: 'test_template_2',
      templateData: {
        subject: 'CRMS GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementReportStatus: 'Completed ',
        obligationReportStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      toAddresses: ['sachith.rangana@syscolabs.com'],
      ccAddresses: [],
      bccAddresses: [],
    };

    const response = await notificationService.pushNotification(jsonBody);
    expect(response).toStrictEqual({
      isSuccess: true,
      payLoad: {
        requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
        isSuccess: true,
      },
    });
  });
  test('pushNotification should return failed status ', async () => {
    sesService.sendNotification = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: false,
    });
    const jsonBody = {
      applicationName: 'crms_gl_posting_ms',
      emailCategory: 'gl_report',
      template: 'test_template_2',
      templateData: {
        subject: 'CRMS GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementReportStatus: 'Completed ',
        obligationReportStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      toAddresses: ['sachith.rangana@syscolabs.com'],
      ccAddresses: [],
      bccAddresses: [],
    };
    const response = await notificationService.pushNotification(jsonBody);
    expect(response.isSuccess).toEqual(false);
  });
});
describe('services: notificationService : testTemplate', () => {
  test('testTemplate should return success status for rebate report notification ', async () => {
    sesService.testRenderTemplate = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: true,
    });
    const jsonBody = {
      template: 'crms_scheduled_rebate_report',
      templateData: {
        subject: 'CRMS Rebate Reports',
        agreementId: '100000065',
        agreementDescription: 'cakeadmin2 sd',
        reportToDate: '3/31/2021',
        reportFromDate: '3/1/2021',
        reportUrl:
          'http://REBATE_REPORT/SCHEDULED/202109/ReportSchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx',
      },
    };

    const response = await notificationService.testTemplate(jsonBody);
    expect(response).toStrictEqual({
      isSuccess: true,
      payLoad: null,
      message: 'Template is valid',
    });
  });

  test('testTemplate  should return failed status ', async () => {
    sesService.testRenderTemplate = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: false,
      code:12
    });
    sesServiceRequestDTO.validateTemplate = jest
    .fn()
    .mockReturnValue({ isValidTemplate: true, schema: {} });
    const jsonBody1 = {
      template: 'crms_scheduled_rebate_report',
      templateData: {
        subject: 'CRMS Rebate Reports2',
        agreementId: '100000065',
        agreementDescription: 'cakeadmin2 sd',
        reportToDate: '3/31/2021',
        reportFromDate: '3/1/2021',
        reportUrl:
          'http://REBATE_REPORT/SCHEDULED/202109/ReportSchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx',
      },
    };

    const response = await notificationService.testTemplate(jsonBody1);
    expect(response).toStrictEqual({
      isSuccess: false,
      payLoad: 12,
    });
  });

  test('testTemplate  should return failed status with dto error', async () => {
    sesService.testRenderTemplate = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: true,
    });
    const jsonBody2 = {
      template: 'crms_scheduled_rebate_report',
      templateData: {
        subject: 'CRMS Rebate Reports2',
        agreementId: '100000065',
        agreementDescription: 'cakeadmin2 sd',
        reportToDate: '3/31/2021',
        reportFromDate: '3/1/2021',
        reportUrl:
          'http://REBATE_REPORT/SCHEDULED/202109/ReportSchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx',
      },
    };
    sesServiceRequestDTO.validateTemplate = jest
      .fn()
      .mockReturnValue({ isValidTemplate: false, schema: {errors:[{}]} });

    await expect(notificationService.testTemplate(jsonBody2)).rejects.toThrow(
      InvalidRequestException
    );
  });
});
