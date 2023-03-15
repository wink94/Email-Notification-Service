/** @format */

import { getDBConfigValue } from '../../config/configHelper';
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

  getEmailAuditEmailAddresses() {
    try {
      const emailsAddresses = getDBConfigValue('audit_emails');

      if (emailsAddresses !== 'NULL' && typeof emailsAddresses === 'string') {
        return emailsAddresses.split(',');
      }
      return [];
    } catch (error) {
      logger.error(error);
      logger.error('audit bcc email addresses fetching failed');
      return [];
    }
  }
}
export default new EmailAuditService();
