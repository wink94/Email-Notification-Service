import HttpStatus from 'http-status-codes';
import request from 'supertest';
import express from 'express';
import NotificationApi from '../notificationApi';
import emailAuditDao from '../../dao/emailAuditDao';
import notificationService from '../../services/notification/notificationService';

jest.mock('../../dao/emailAuditDao');
jest.mock('../../services/notification/notificationService');

const app = express();
const notificationApi = new NotificationApi();
app.use(express.json());
app.use('/notification', notificationApi.router);

describe('NotificationApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /notification', () => {
    test('push notification API should respond with bad request status', async () => {
      const response = await request(app)
        .post('/notification')
        .set('Accept', 'application/json')
        .send({});

      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body).toBeDefined();
    });

    test('push notification API should respond with success status', async () => {
      const requestBody = {
        applicationName: 'product-info',
        emailCategory: 'product-info',
        template: 'Template1',
        templateData: {
          subject: ' test 1',
          name: ' test 1',
          product: 'tshirt XL',
        },
        toAddresses: [
          'achira100@gmail.com', 'Sameeraoulu@gmail.com',
        ],
        ccAddresses: [
        ],
        bccAddresses: [
        ],
      };
      notificationService.pushNotification.mockResolvedValue({
        isSuccess: true,
        payLoad: {
          requestId: '1aaee205-fbbf-436f-881d-c98325c33806',
        },
      });

      const response = await request(app)
        .post('/notification')
        .set('Accept', 'application/json')
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.ACCEPTED);
      expect(response.body).toStrictEqual({
        status: "success",
        data: {
          requestId: "1aaee205-fbbf-436f-881d-c98325c33806",
          message: "127.0.0.1",
        },
      });
    });

    test('push notification API should respond with error status', async () => {
      const requestBody = {
        applicationName: 'product-info',
        emailCategory: 'product-info',
        template: 'Template1',
        templateData: {
          subject: ' test 1',
          name: ' test 1',
          product: 'tshirt XL',
        },
        toAddresses: [
          'achira100@gmail.com', 'Sameeraoulu@gmail.com',
        ],
        ccAddresses: [
        ],
      };
      notificationService.pushNotification.mockResolvedValue({
        isSuccess: false,
        payLoad: {
          message: 'Error message',
        },
      });

      const response = await request(app)
        .post('/notification')
        .set('Accept', 'application/json')
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(response.body).toStrictEqual({
        status: 'error',
        data: { message: { message: 'Error message' } },
      });
    });
  });

  describe('GET /notification', () => {
    test('getAllEmailAudits API should respond with success status', async () => {
      const auditData = [
        // Add your email audit data here
      ];
      emailAuditDao.getAllEmailAuditEntry.mockResolvedValue(auditData);

      const response = await request(app).get('/notification');

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: 'success',
        data: auditData,
      });
    });
    test('getAllEmailAudits API should handle errors', async () => {
      emailAuditDao.getAllEmailAuditEntry.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app).get('/notification');

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('GET /notification/email-subject/:emailSubject', () => {
    test('getEmailAuditBySubject API should respond with success status', async () => {
      const emailSubject = 'TestEmailSubject';
      const auditData = [

      ];
      emailAuditDao.getEmailAuditByEmailSubject.mockResolvedValue(auditData);

      const response = await request(app).get(`/notification/email-subject/${emailSubject}`);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: 'success',
        data: auditData,
      });
    });

    test('getEmailAuditBySubject API should handle errors', async () => {
      const emailSubject = 'TestEmailSubject';
      emailAuditDao.getEmailAuditByEmailSubject.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app).get(`/notification/email-subject/${emailSubject}`);

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
