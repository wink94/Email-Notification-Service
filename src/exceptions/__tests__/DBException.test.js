import HttpStatus from 'http-status-codes';
import DBException from '../DBException';

describe('exceptions/DBException tests', () => {
  test('should set passed in message and the name to exception with default status code and error code 500', () => {
    const exception = new DBException();
    expect(exception.name).toEqual('DBErrorException');
    expect(exception.message).toEqual('DB exception');
    expect(exception.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.errorCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
