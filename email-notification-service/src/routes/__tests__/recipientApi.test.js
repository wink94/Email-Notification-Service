import HttpStatus from 'http-status-codes';
import request from 'supertest';
import express from 'express';
import RecipientsApi from '../recipientsApi';
import recipientDao from '../../dao/recipientDao';

jest.mock('../../dao/recipientDao');

const app = express();
const recipientsApi = new RecipientsApi();
app.use(express.json());
app.use('/recipients', recipientsApi.router);

describe('RecipientsApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /recipients', () => {
    test('addRecipients API should respond with created status', async () => {
      const requestBody = {
        // Add your request body here
      };
      const createdRecipient = {
        // Add your created recipient data here
      };
      recipientDao.insertRecipients.mockResolvedValue(createdRecipient);

      const response = await request(app)
        .post('/recipients')
        .set('Accept', 'application/json')
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(response.body).toStrictEqual({
        status: 'success',
        data: createdRecipient,
      });
    });

    test('addRecipients API should handle errors', async () => {
      const requestBody = {

      };
      recipientDao.insertRecipients.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app)
        .post('/recipients')
        .set('Accept', 'application/json')
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('GET /recipients', () => {
    test('getAllRecipients API should respond with success status', async () => {
      const recipientsData = [
        // Add your recipients data here
      ];
      recipientDao.getAllRecipient.mockResolvedValue(recipientsData);

      const response = await request(app).get('/recipients');

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: 'success',
        data: recipientsData,
      });
    });
    test('getAllRecipients API should handle errors', async () => {
      recipientDao.getAllRecipient.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app).get('/recipients');

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('GET /recipients/:recipientId', () => {
    test('getRecipientById API should respond with success status', async () => {
      const recipientId = '1';
      const recipientData = {
        // Add your recipient data here
      };
      recipientDao.getRecipient.mockResolvedValue(recipientData);

      const response = await request(app).get(`/recipients/${recipientId}`);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: 'success',
        data: recipientData,
      });
    });

    test('getRecipientById API should handle errors', async () => {
      const recipientId = '1';
      recipientDao.getRecipient.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app).get('/recipients/1');

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('DELETE /recipients/:recipientId', () => {
    test('deleteRecipientById API should respond with no content status', async () => {
      const recipientId = '1';
      recipientDao.deleteRecipient.mockResolvedValue();

      const response = await request(app).delete(`/recipients/${recipientId}`);

      expect(response.status).toEqual(HttpStatus.NO_CONTENT);
    });

    test('deleteRecipientById API should handle errors', async () => {
      const recipientId = '1';
      recipientDao.deleteRecipient.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app).delete('/recipients/1');

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('PATCH /recipients/:recipientId', () => {
    test('updateRecipientById API should respond with success status', async () => {
      const recipientId = '1';
      const requestBody = {
        toAddresses: ['abcs@gmail.com'],
        ccAddresses: [],
        bccAddresses: [],
        recipientName: 'abc',
      };
      recipientDao.updateRecipient.mockResolvedValue();

      const response = await request(app)
        .patch(`/recipients/${recipientId}`)
        .set('Accept', 'application/json')
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: 'success',
        data: { message: 'Recipient updated successfully.' },
      });
    });

    test('updateRecipientById API should handle errors', async () => {
      const recipientId = '1';
      const requestBody = {

      };
      recipientDao.updateRecipient.mockRejectedValue(new Error('errorMessage'));

      const response = await request(app)
        .patch('/recipients/1')
        .set('Accept', 'application/json')
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
