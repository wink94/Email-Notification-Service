import templateDao from '../../../dao/templateDao';
import notificationService from '../notificationService';
import recipientDao from '../../../dao/recipientDao';
import sesService from '../../sesService/sesService';

jest.mock('../../../services/sesService/sesService');
jest.mock('../../../dao/templateDao');
jest.mock('../../../dao/recipientDao');

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
      applicationName: 'abc_gl_posting_ms',
      emailCategory: 'gl_report',
      template: 'test_template_2',
      templateData: {
        subject: 'abc GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementReportStatus: 'Completed ',
        obligationReportStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      toAddresses: ['abc@gmail.com'],
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

  test('pushNotification should return success status tempalte id and recipient id ', async () => {
    sesService.sendNotification = () => ({
      requestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      isSuccess: true,
    });
    templateDao.getTemplate.mockResolvedValue([
      {
        templateId: 1,
        templateName: 'Template12',
        templateBody: {
          Template: {
            HtmlPart:
              '<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>',
            TextPart:
              'Dear {{name}},\r\nYour Are you interested in buying our {{product}}.',
            SubjectPart: '{{subject}}',
            TemplateName: 'Template21',
          },
        },
        active: 1,
        templateSubject: '"test1-templateSubject"',
        createdDate: '2023-04-19T01:57:21.000Z',
        modifiedDate: '2023-05-01T02:17:34.000Z',
      },
    ]);
    recipientDao.getRecipient.mockResolvedValue([
      {
        recipientId: 1,
        recipientName: 'test-rec222',
        emailAddresses: {
          ccAddresses: ['abcs@gmail.com'],
          toAddresses: ['abcs@gmail.com'],
          bccAddresses: [],
        },
        active: 1,
        createdDate: '2023-04-05T14:48:27.000Z',
        modifiedDate: '2023-05-01T02:38:51.000Z',
      },
    ]);
    const jsonBody = {
      applicationName: 'product-info',
      emailCategory: 'product-info',
      templateId: 1,
      templateData: {
        subject: ' test 1',
        name: ' test 1',
        product: 'tshirt XL',
      },
      recipientId: 16,
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
      applicationName: 'abc_reporting_ms',
      emailCategory: 'gl_report',
      template: 'test_template_2',
      templateData: {
        subject: 'abc GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementReportStatus: 'Completed ',
        obligationReportStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      toAddresses: ['abc@gmail.com'],
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
      applicationName: 'abc_gl_posting_ms',
      emailCategory: 'gl_report',
      template: 'test_template_2',
      templateData: {
        subject: 'abc GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementReportStatus: 'Completed ',
        obligationReportStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      toAddresses: ['abc@gmail.com'],
      ccAddresses: [],
      bccAddresses: [],
    };
    const response = await notificationService.pushNotification(jsonBody);
    expect(response.isSuccess).toEqual(false);
  });
});
