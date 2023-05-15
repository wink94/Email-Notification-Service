import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import recipientDao from '../dao/recipientDao';
import { mapRecipientRequestBody } from '../dto/recipientDTO';
import { createSuccessResponse } from '../util/responseGenerator';
import { generateResourceLinks } from '../util/helpers';

class RecipientsApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.addRecipients);
    this.router.get('/', this.getAllRecipients);
    this.router.get('/:recipientId', this.getRecipientById);
    this.router.delete('/:recipientId', this.deleteRecipientById);
    this.router.patch('/:recipientId', this.updateRecipientById);
  }

  async addRecipients(req, res, next) {
    try {
      const data = await recipientDao.insertRecipients(
        mapRecipientRequestBody(req.body),
      );
      res.status(HttpStatus.CREATED).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }

  async getAllRecipients(req, res, next) {
    try {
      const data = await recipientDao.getAllRecipient();
      const hypermediaAddedData = data.map((recipient) => ({
        ...recipient,
        links: generateResourceLinks(req, recipient.recipientId),
      }));
      res
        .status(HttpStatus.OK)
        .send(createSuccessResponse(hypermediaAddedData, null));
    } catch (error) {
      next(error);
    }
  }

  async getRecipientById(req, res, next) {
    try {
      const data = await recipientDao.getRecipient(req.params.recipientId);

      res.status(HttpStatus.OK).send(
        createSuccessResponse(
          {
            ...data[0],
            links: generateResourceLinks(req, data[0].recipientId),
          },
          null,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteRecipientById(req, res, next) {
    try {
      await recipientDao.deleteRecipient(req.params.recipientId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  async updateRecipientById(req, res, next) {
    try {
      await recipientDao.updateRecipient(
        req.params.recipientId,
        mapRecipientRequestBody(req.body),
      );

      res
        .status(HttpStatus.OK)
        .send(createSuccessResponse(null, 'Recipient updated successfully.'));
    } catch (error) {
      next(error);
    }
  }
}
export default RecipientsApi;
