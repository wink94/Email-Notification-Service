import { getModule } from '../models/index';

class emailTemplateDao {
  async insertTemplateEntry(dataParams) {
    const Template = getModule('emailTemplate');
    return Template.upsert({
      Tem_Name: dataParams.name,
      Template: dataParams.template,
      Active: dataParams.active,
      Tem_Subject: dataParams.subject,
      Tem_Body: dataParams.body,
    });
  }
}

export default new emailTemplateDao();
