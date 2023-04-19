import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { sesServiceRequestDTO } from '../dto/sesServiceRequestDTO';
import notificationService from '../services/notification/notificationService';
import { createErrorResponse, createSuccessResponse } from '../util/responseGenerator';

class NotificationApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.pushNotification);
  }

  /**
   * Validate preconditions and push notification
   * @param req Request object
   * @param res Response object
   * @param next
   */
  async pushNotification(req, res, next) {
    try {
      const response = await notificationService.pushNotification(
        sesServiceRequestDTO(req.body),
      );

      if (response.isSuccess) {
        res.status(HttpStatus.ACCEPTED).send(createSuccessResponse(response.payLoad, null));
      } else {
        res.status(HttpStatus.BAD_REQUEST).send(createErrorResponse(null, response.payLoad));
      }
    } catch (error) {
      next(error);
    }
  }
}
export default NotificationApi;
