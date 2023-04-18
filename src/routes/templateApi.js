import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import templateDao from '../dao/templateDao';
// import { mapTemplateRequestBody } from '../dto/TemplateDTO';
import { createSuccessResponse } from '../util/responseGenerator';

class TemplateApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addTemplates);
    this.router.get('/', this.getAllTemplates);
    this.router.get('/:templateID', this.getTemplateById);
    // this.router.delete('/', this.deleteTemplate);
    // this.router.put('/', this.deleteTemplate);
  }

  async addTemplates(req, res, next) {
    try {
      const data = await templateDao.insertTemplates(req.body);
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

  // async deleteTemplates(req, res, next) {
  //   try {
  //     const data = await templateDao.getTemplate(req.params.templateId); // check agian
  //     res.status(HttpStatus.OK).send(createSuccessResponse(data, null)); // maybe deleted?
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async updateTemplates(req, res, next) {
  //   try {
  //     const data = await templateDao.getTemplate(req.params.templateId); // check agian
  //     res.status(HttpStatus.OK).send(createSuccessResponse(data, null)); // maybe deleted?
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
export default TemplateApi;
