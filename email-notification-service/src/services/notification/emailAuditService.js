/** @format */

import EmailAuditDao from '../../dao/emailAuditDao';
import logger from '../../util/logger';

class EmailAuditService {
  async addEmailAuditEntry(emailAuditData) {
    try {
      const auditEntry = await EmailAuditDao.insertEmailAuditEntry(emailAuditData);

      logger.info('successfully added email audit entry');
      return auditEntry[1];
    } catch (error) {
      logger.error(error);
      logger.error('Email audit entry adding failed');
      return false;
    }
  }
}
export default new EmailAuditService();
