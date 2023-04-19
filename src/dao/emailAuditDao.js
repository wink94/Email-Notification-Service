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
}

export default new EmailAuditDao();
