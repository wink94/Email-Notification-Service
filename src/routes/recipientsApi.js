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
}
export default RecipientsApi;
