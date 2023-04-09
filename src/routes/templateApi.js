import { Router } from 'express';

class TemplateApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addTemplate);
    this.router.get('/', this.getAllTemplates);
    this.router.get('/:recipientId', this.getTemplateById);
    this.router.delete('/', this.deleteTemplate);
    this.router.put('/', this.deleteTemplate);
  }

  async addTemplate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }
}
export default TemplateApi;
