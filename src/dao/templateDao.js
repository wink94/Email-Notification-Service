import DBException from '../exceptions/DBException';
import { getModule } from '../models/index';

class TemplateDao {
  async insertTemplate(dataParams) {
    try {
      const template = getModule('template');
      return template.create(
        dataParams,
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getAllTemplate() {
    try {
      const template = getModule('template');
      return template.findAll({ raw: true, subQuery: false });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getTemplate(recipientId) {
    try {
      const template = getModule('template');
      return template.findAll({
        where: { templateId },
        raw: true,
      });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }
}

export default new TemplateDao();

