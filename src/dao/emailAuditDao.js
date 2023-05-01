import DBException from '../exceptions/DBException';
import { getModule } from '../models/index';

class EmailAuditDao {
  async insertEmailAuditEntry(dataParams) {
    const emailNotificationAudit = getModule('emailNotificationAudit');
    return emailNotificationAudit.upsert({
      emailSubject: dataParams.subject,
      receivers: dataParams.receivers,
      sesRequestId: dataParams.sesRequestId,
    });
  }

  async getAllEmailAuditEntry() {
    try {
      const emailNotificationAudit = getModule('emailNotificationAudit');
      return emailNotificationAudit.findAll({ raw: true, subQuery: false });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getEmailAuditByEmailSubject(emailSubject) {
    try {
      const emailNotificationAudit = getModule('emailNotificationAudit');
      return emailNotificationAudit.findAll({ raw: true, where: { emailSubject } });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }
}

export default new EmailAuditDao();
