// Import required modules
import EmailAuditDao from '../emailAuditDao';
import { getModule } from '../../models/index';
import DBException from '../../exceptions/DBException';
import * as models from '../../models/index';

// Mocking getModule, DBException, and Sequelize Model methods
jest.mock('../../models/index');
jest.mock('../../exceptions/DBException');
const mockUpsert = jest.fn();
const mockFindAll = jest.fn();
getModule.mockReturnValue({
  upsert: mockUpsert,
  findAll: mockFindAll,
});

describe('EmailAuditDao', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('insertEmailAuditEntry should call upsert with correct parameters', async () => {
    const dataParams = {
      subject: 'Test Subject',
      receivers: ['test@example.com'],
      sesRequestId: '12345',
    };

    await EmailAuditDao.insertEmailAuditEntry(dataParams);

    expect(mockUpsert).toHaveBeenCalledWith({
      emailSubject: dataParams.subject,
      receivers: dataParams.receivers,
      sesRequestId: dataParams.sesRequestId,
    });
  });

  test('getAllEmailAuditEntry should call findAll with correct options', async () => {
    await EmailAuditDao.getAllEmailAuditEntry();

    expect(mockFindAll).toHaveBeenCalledWith({ raw: true, subQuery: false });
  });

  test('getEmailAuditByEmailSubject should call findAll with correct options', async () => {
    const emailSubject = 'Test Subject';

    await EmailAuditDao.getEmailAuditByEmailSubject(emailSubject);

    expect(mockFindAll).toHaveBeenCalledWith({
      raw: true,
      where: { emailSubject },
    });
  });

  test('getAllEmailAuditEntry should throw DBException when an error occurs', async () => {
    const mockFindAll = jest.fn().mockImplementation(() => {
      throw new Error('Some Error');
    });
    const emailNotificationAudit = { findAll: mockFindAll };

    jest.spyOn(models, 'getModule').mockReturnValue(emailNotificationAudit);

    try {
      await EmailAuditDao.getAllEmailAuditEntry();
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  test('getEmailAuditByEmailSubject should throw DBException when an error occurs', async () => {
    const mockFindAll = jest.fn().mockImplementation(() => {
      throw new Error('Some Error');
    });
    const emailNotificationAudit = { findAll: mockFindAll };

    jest.spyOn(models, 'getModule').mockReturnValue(emailNotificationAudit);

    try {
      await EmailAuditDao.getEmailAuditByEmailSubject('Test Subject');
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });
});
