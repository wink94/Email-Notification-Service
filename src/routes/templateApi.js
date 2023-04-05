import { Router } from 'express';

class TemplateApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addTemplate);
  }

  async addTemplate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }
}
export default TemplateApi;
