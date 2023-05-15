import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { sesServiceRequestDTO } from '../dto/sesServiceRequestDTO';
import notificationService from '../services/notification/notificationService';
import emailAuditDao from '../dao/emailAuditDao';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../util/responseGenerator';
import { generateResourceLinks } from '../util/helpers';

class NotificationApi {
  constructor() {
    this.router = new Router({ mergeParams: true });
    this.router.post('/', this.pushNotification);
    this.router.get('/', this.getAllEmailAudits);
    this.router.get(
      '/email-subject/:emailSubject',
      this.getEmailAuditBySubject,
    );
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
        res
          .status(HttpStatus.ACCEPTED)
          .send(createSuccessResponse(response.payLoad, req.hostname));
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .send(createErrorResponse(null, response.payLoad));
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllEmailAudits(req, res, next) {
    try {
      const data = await emailAuditDao.getAllEmailAuditEntry();
      const hypermediaAddedData = data.map((email) => ({
        ...email,
        links: generateResourceLinks(
          req,
          email.emailNotificationAuditPrimaryId,
        ),
      }));
      res
        .status(HttpStatus.OK)
        .send(createSuccessResponse(hypermediaAddedData, null));
    } catch (error) {
      next(error);
    }
  }

  async getEmailAuditBySubject(req, res, next) {
    try {
      const { emailSubject } = req.params;
      const data = await emailAuditDao.getEmailAuditByEmailSubject(
        emailSubject,
      );
      res.status(HttpStatus.OK).send(createSuccessResponse(data, null));
    } catch (error) {
      next(error);
    }
  }
}
export default NotificationApi;
