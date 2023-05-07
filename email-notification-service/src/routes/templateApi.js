import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import templateDao from '../dao/templateDao';
import { mapTemplateRequestBody } from '../dto/templateDTO';
import { createSuccessResponse } from '../util/responseGenerator';

class TemplateApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addTemplates);
    this.router.get('/', this.getAllTemplates);
    this.router.get('/:templateId', this.getTemplateById);
    this.router.delete('/:templateId', this.deleteTemplate);
    this.router.patch('/:templateId', this.updateTemplate);
  }

  async addTemplates(req, res, next) {
    try {
      const data = await templateDao.insertTemplate(mapTemplateRequestBody(req.body));
      res.status(HttpStatus.CREATED).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }

  async getAllTemplates(req, res, next) {
    try {
      const data = await templateDao.getAllTemplates();
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }

  async getTemplateById(req, res, next) {
    try {
      const data = await templateDao.getTemplate(req.params.templateId);
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }

  async deleteTemplate(req, res, next) {
    try {
      await templateDao.deleteTemplate(req.params.templateId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  async updateTemplate(req, res, next) {
    try {
      await templateDao.updateTemplate(req.params.templateId, mapTemplateRequestBody(req.body));
      res.status(HttpStatus.OK).send(createSuccessResponse(null, 'Template updated successfully.'));
    } catch (error) {
      next(error);
    }
  }
}
export default TemplateApi;
