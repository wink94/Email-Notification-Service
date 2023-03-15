import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import notificationService from '../../services/notification/notificationService';
import { createErrorResponse, createSuccessResponse } from '../../util/responseGenerator';

class TemplateApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.testTemplate);
  }

  async testTemplate(req, res, next) {
    try {
      const response = await notificationService.testTemplate(
        req.body,
      );

      if (response.isSuccess) {
        res.status(HttpStatus.ACCEPTED).send(
          createSuccessResponse(response.payLoad, response.message),
        );
      } else {
        res.status(HttpStatus.BAD_REQUEST).send(createErrorResponse(null, response.payLoad));
      }
    } catch (error) {
      next(error);
    }
  }
}
export default TemplateApi;
