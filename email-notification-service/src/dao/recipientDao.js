import DBException from '../exceptions/DBException';
import { getModule } from '../models/index';

class RecipientDao {
  async insertRecipients(dataParams) {
    try {
      const recipient = getModule('recipient');
      return recipient.create(
        dataParams,
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getAllRecipient() {
    try {
      const recipient = getModule('recipient');
      return recipient.findAll({ raw: true, subQuery: false });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getRecipient(recipientId) {
    try {
      const recipient = getModule('recipient');
      return recipient.findAll({
        where: { recipientId },
        raw: true,
      });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async deleteRecipient(recipientId) {
    try {
      const recipient = getModule('recipient');
      return recipient.update(
        { active: 0 },
        { where: { recipientId } },
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async updateRecipient(recipientId, dataParams) {
    try {
      const recipient = getModule('recipient');
      return recipient.update(
        {
          ...dataParams,
          recipientId,
        },
        {
          where: { recipientId },
        },
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }
}

export default new RecipientDao();
