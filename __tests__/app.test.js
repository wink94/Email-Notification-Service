import request from 'supertest';
import HttpStatus from 'http-status-codes';
// eslint-disable-next-line import/named
import { app } from '../src/app';

describe('app test', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/notification/');
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  test('It should response with health check status', async () => {
    const response = await request(app).get('/v1/notification/healthcheck');
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('memoryUsage');
    expect(response.body.data).toHaveProperty('nodeVersion');
    expect(response.body.data).toHaveProperty('nodeEnv');
  });

  test('It should respond with the not found error', async () => {
    const response = await request(app).get('/v1/fakePath');
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  test('It should handle the plain text content via gzip', async () => {
    const parseList = [];
    JSON.parse = ((data) => parseList.push(data));
    const response = await request(app).post('/v1/notification/121212121')
      .set('content-type', 'text/plain')
      .send('H8KLCAAAAAAAAAPCq1bDiklNTHFML0pNw41Nw40rw7FMUcKyUjIxMzcxMDQwUMKqBQDDiGTCmcKXHgAAAA==');
    expect(parseList[0]).toStrictEqual('{"leadAgreementId":"46740100"}');
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
