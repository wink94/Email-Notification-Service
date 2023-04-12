import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import templateDao from '../dao/templateDao';
import { maptemplateRequestBody } from '../dto/templateDTO';
import { createSuccessResponse } from '../util/responseGenerator';

class TemplateApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addTemplate);
    this.router.get('/:templateId', this.gettemplateById);
    this.router.delete('/:templateId', this.deletetemplates);
    this.router.put('/:templateId', this.updatetemplates);
  }

  async addTemplate(req, res, next) {
    try {
      const data = await templateDao.insertTemplate(maptemplateRequestBody(req.body));
      res.status(HttpStatus.CREATED).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }
  async getTemplateById(req, res, next) {
    try {
      const data = await templateDao.gettemplate(req.params.templateId);
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }
  
  async deleteRTemplate(req, res, next) {
    try {
      const data = await templateDao.daletetemplate(req.params.templateId); // check agian 
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null)); // maybe deleted?
    } catch (error) {
      next(error);
    }
  }

  
  async updateTemplate(req, res, next) {
    try {
      const data = await templateDao.updatetemplate(req.params.templateId); // check agian 
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null)); // maybe deleted?
    } catch (error) {
      next(error);
    }
  }
}


export default TemplateApi;
