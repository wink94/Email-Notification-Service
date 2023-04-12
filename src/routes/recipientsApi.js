import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import recipientDao from '../dao/recipientDao';
import { mapRecipientRequestBody } from '../dto/recipientDTO';
import { createSuccessResponse } from '../util/responseGenerator';

class RecipientsApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addRecipients);
    this.router.get('/', this.getAllRecipients);
    this.router.get('/:recipientId', this.getRecipientById);
    this.router.delete('/:recipientId', this.deleteRecipients);
    this.router.put('/:recipientId', this.updateRecipients);
  }

  async addRecipients(req, res, next) {
    try {
      const data = await recipientDao.insertRecipients(mapRecipientRequestBody(req.body));
      res.status(HttpStatus.CREATED).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }

  async getAllRecipients(req, res, next) {
    try {
      const data = await recipientDao.getAllRecipient();
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }

  async getRecipientById(req, res, next) {
    try {
      const data = await recipientDao.getRecipient(req.params.recipientId);
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }
  
  async deleteRecipients(req, res, next) {
    try {
      const data = await recipientDao.daleteRecipient(req.params.recipientId); // check agian 
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null)); // maybe deleted?
    } catch (error) {
      next(error);
    }
  }

  
  async updateRecipients(req, res, next) {
    try {
      const data = await recipientDao.updateRecipient(req.params.recipientId); // check agian 
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null)); // maybe deleted?
    } catch (error) {
      next(error);
    }
  }


}
export default RecipientsApi;