import DBException from '../exceptions/DBException';
import { getModule } from '../models/index';

class TemplateDao {
  async insertRecipients(dataParams) {
    try {
      const recipient = getModule('template');
      return recipient.create(
        dataParams,
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getAllRecipient() {
    try {
      const recipient = getModule('template');
      return recipient.findAll({ raw: true, subQuery: false });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getRecipient(recipientId) {
    try {
      const recipient = getModule('template');
      return recipient.findAll({
        where: { recipientId },
        raw: true,
      });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }
}

export default new TemplateDao();

