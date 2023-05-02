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

  async getAllTemplates() {
    try {
      const template = getModule('template');
      return template.findAll({ raw: true, subQuery: false });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getTemplate(templateId) {
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

  async deleteTemplate(templateId) {
    try {
      const template = getModule('template');
      return template.update(
        { active: 0 },
        { where: { templateId } },
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async updateTemplate(templateId, dataParams) {
    try {
      const template = getModule('template');
      return template.upsert(
        {
          templateId,
          ...dataParams,
        },
        {
          where: { templateId },
        },
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }
}

export default new TemplateDao();
