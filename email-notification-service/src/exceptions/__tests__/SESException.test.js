import HttpStatus from 'http-status-codes';
import SESException from '../SESException';

describe('exceptions/SESException', () => {
  test('Basic exception', async () => {
    const exception = new SESException('Email service error', HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.name).toBe('SESException');
    expect(exception.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.causes).toBe('Email service error');
  });
  test('Basic exception with error', async () => {
    const exception = new SESException();
    expect(exception.name).toBe('SESException');
    expect(exception.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.causes).toBeDefined();
  });
});
