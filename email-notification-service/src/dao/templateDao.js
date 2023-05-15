import DBException from '../exceptions/DBException';
import { getModule } from '../models/index';
import sesService from '../services/sesService/sesService';

class TemplateDao {
  async insertTemplate(dataParams) {
    try {
      await sesService.saveTemplate(dataParams);

      const template = getModule('template');
      return template.create(dataParams);
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getAllTemplates() {
    try {
      const template = getModule('template');
      return template.findAll({
        raw: true,
        subQuery: false,
        where: { active: 1 },
      });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getTemplate(templateId) {
    try {
      const template = getModule('template');
      return template.findAll({
        where: { templateId, active: 1 },
        raw: true,
      });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async deleteTemplate(templateId) {
    try {
      const template = getModule('template');
      return template.update({ active: 0 }, { where: { templateId } });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async updateTemplate(templateId, dataParams) {
    try {
      await sesService.updateTemplate(dataParams);

      const template = getModule('template');
      return template.update(
        {
          ...dataParams,
          templateId,
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
