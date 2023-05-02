import InvalidRequestException from '../../exceptions/InvalidRequestException';
import { sesServiceRequestDTO } from '../sesServiceRequestDTO';

describe('dto/sesServiceRequestDTO tests', () => {
  test('should return the json with correct properties', async () => {
    const data = {
      applicationName: 'Financial_Process',
      emailCategory: 'gl_',
      template: 'gl_posting',
      templateData: {
        subject: ' GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementStatus: 'Completed',
        obligationStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
        agreementURL: 'http://www.abc.com',
        obligationURL: 'http://www.abc.com',
      },
      toAddresses: ['sachith.rangana@gmail.com'],
      ccAddresses: [],
      bccAddresses: [],
    };

    const DTO = sesServiceRequestDTO(data);
    expect(DTO).toHaveProperty('applicationName', 'Financial_Process');
    expect(DTO).toHaveProperty('emailCategory', 'gl_');
    expect(DTO).toHaveProperty('template', 'gl_posting');
    expect(DTO).toHaveProperty('toAddresses', ['sachith.rangana@gmail.com']);
    expect(DTO).toHaveProperty('ccAddresses', []);
    expect(DTO).toHaveProperty('bccAddresses', []);
  });

  test('should call invalid request exception when template required data is missing scenario 02', async () => {
    const data = {
      templateData: {
        subject: ' GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementStatus: 'Completed',
        obligationStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
      },
      ccAddresses: [],
      bccAddresses: [],
    };
    expect(() => {
      sesServiceRequestDTO(data);
    }).toThrow(InvalidRequestException);
  });

  test('should return the json with correct properties GL ', async () => {
    const data = {
      applicationName: 'Financial_Process',
      emailCategory: 'gl_',
      template: 'gl_posting',
      templateData: {
        subject: ' GL Posting – Job Status',
        dateTime: '06-02-2020 19:23:23',
        userEmail: 'test@user.com',
        agreementStatus: 'Completed',
        obligationStatus: 'Failed',
        successOpcos: [{ column_1: '006', column_3: '003', column_2: '008' }],
        failedOpcos: [{ column_1: '005', column_2: '006', column_3: '003' }],
        failures: false,
        agreementURL: 'http://www.abc.com',
        obligationURL: 'http://www.abc.com',
      },
      toAddresses: ['sachith.rangana@gmail.com'],
      ccAddresses: [],
      bccAddresses: [],
    };

    const DTO = sesServiceRequestDTO(data);
    expect(DTO).toHaveProperty('applicationName', 'Financial_Process');
    expect(DTO).toHaveProperty('emailCategory', 'gl_');
    expect(DTO).toHaveProperty('template', 'gl_posting');
    expect(DTO).toHaveProperty('toAddresses', ['sachith.rangana@gmail.com']);
    expect(DTO).toHaveProperty('ccAddresses', []);
    expect(DTO).toHaveProperty('bccAddresses', []);
  });

  test('should return the json with correct properties  ', async () => {
    const data = {
      applicationName: 'ms',
      emailCategory: 'notification',
      template: 'scheduled',
      templateData: {
        subject: '  s',
        agreementId: '100000065',
        agreementDescription: 'cakeadmin2 sd',
        ToDate: '3/31/2021',
        FromDate: '3/1/2021',
        Url: 'http://_/SCHEDULED/202109/SchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx',
      },
      toAddresses: [
        'windula.kularatne@gmail.com',
      ],
      ccAddresses: [
      ],
      bccAddresses: [
      ],
    };

    const DTO = sesServiceRequestDTO(data);
    expect(DTO).toHaveProperty('applicationName', 'ms');
    expect(DTO).toHaveProperty('emailCategory', 'notification');
    expect(DTO).toHaveProperty('template', 'scheduled');
    expect(DTO).toHaveProperty('toAddresses', ['windula.kularatne@gmail.com']);
    expect(DTO).toHaveProperty('ccAddresses', []);
    expect(DTO).toHaveProperty('bccAddresses', []);
  });

  test('should call invalid request exception when template required data is missing fr GL ', async () => {
    const data = {
      applicationName: 'Financial_Process',
      emailCategory: 'gl_',
      template: '_gl_posting',
      templateData: {

      },
      toAddresses: ['sachith.rangana@gmail.com'],
      ccAddresses: [],
      bccAddresses: [],
    };

    expect(() => {
      sesServiceRequestDTO(data);
    }).toThrow(InvalidRequestException);
  });

  test('should call invalid request exception when template required data is missing fr  ', async () => {
    const data = {
      applicationName: 'Financial_Process',
      emailCategory: '---notification',
      template: '_scheduled__',
      templateData: {

      },
      toAddresses: ['sachith.rangana@gmail.com'],
      ccAddresses: [],
      bccAddresses: [],
    };

    expect(() => {
      sesServiceRequestDTO(data);
    }).toThrow(InvalidRequestException);
  });
});
