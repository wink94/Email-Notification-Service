/** @format */

import emailAuditService from '../emailAuditService';
import emailAuditDao from '../../../dao/emailAuditDao';

jest.mock('../../../config/configHelper');
jest.mock('../../../dao/emailAuditDao');
describe('services: emailAuditService : addEmailAuditEntry', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('addEmailAuditEntry should return success status ', async () => {
    emailAuditDao.insertEmailAuditEntry.mockResolvedValue(['', true]);
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@gmail.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'abc abc Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };

    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toStrictEqual(true);
  });
  test('addEmailAuditEntry should return failed status ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@gmail.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'abc abc Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };
    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toEqual(false);
  });

  test('addEmailAuditEntry should return failed status ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@gmail.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'abc abc Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };
    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toEqual(false);
  });

  test('addEmailAuditEntry should return excpetion ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@gmail.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'abc abc Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };
    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toEqual(false);
  });
});
