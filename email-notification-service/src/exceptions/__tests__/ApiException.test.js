import HttpStatus from 'http-status-codes';
import ApiException from '../ApiException';

describe('exceptions/ApiException', () => {
  test('Basic exception', async () => {
    const exception = new ApiException('Api Error', HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.name).toBe('ApiException');
    expect(exception.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.message).toBe('Api Error');
  });
});
