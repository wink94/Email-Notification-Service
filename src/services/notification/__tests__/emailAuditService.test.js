/** @format */

import emailAuditService from '../emailAuditService';

jest.mock('../../../config/configHelper');
jest.mock('../../../dao/emailAuditDao');
describe('services: emailAuditService : addEmailAuditEntry', () => {
  test('addEmailAuditEntry should return success status ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@syscolabs.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'CRMS GL Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };

    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toStrictEqual(true);
  });
  test('addEmailAuditEntry should return failed status ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@syscolabs.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'CRMS GL Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };
    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toEqual(false);
  });

  test('addEmailAuditEntry should return failed status ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@syscolabs.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'CRMS GL Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };
    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toEqual(false);
  });

  test('addEmailAuditEntry should return excpetion ', async () => {
    const jsonBody = {
      receivers: {
        ToAddresses: ['sachith.rangana@syscolabs.com'],
        CcAddresses: [],
        BccAddresses: [],
      },
      subject: 'CRMS GL Posting – Job Status',
      sesRequestId: '1aaee205-fbbf-436f-881d-c98325c33807',
      emailNotificationAuditPrimaryId: null,
    };
    const response = await emailAuditService.addEmailAuditEntry(jsonBody);
    expect(response).toEqual(false);
  });
});
describe('services: emailAuditService : getEmailAuditEmailAddresses', () => {
  test('getEmailAuditEmailAddresses should return success response  ', () => {
    const response = emailAuditService.getEmailAuditEmailAddresses();

    expect(response).toStrictEqual([
      'sachith.rangana@syscolabs.com',
      'sss.rangana@syscolabs.com',
    ]);
  });

  test('getEmailAuditEmailAddresses  should return failed response ', () => {
    const response = emailAuditService.getEmailAuditEmailAddresses();
    expect(response).toStrictEqual([]);
  });

  test('getEmailAuditEmailAddresses  should return failed response for exception thrown when fetching db config ', () => {
    const response = emailAuditService.getEmailAuditEmailAddresses();
    expect(response).toStrictEqual([]);
  });
});
