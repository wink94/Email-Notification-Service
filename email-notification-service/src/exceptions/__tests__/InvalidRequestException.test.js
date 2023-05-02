import HttpStatus from 'http-status-codes';
import InvalidRequestException from '../InvalidRequestException';

describe('exceptions/DataAccessException tests', () => {
  test('should set passed in message and the name to exception with default status code and error code 400', () => {
    const exception = new InvalidRequestException('message');
    expect(exception.name).toEqual('InvalidRequestException');
    expect(exception.message).toEqual('message');
    expect(exception.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.errorCode).toEqual(HttpStatus.BAD_REQUEST);
  });

  test('should set passed params and the name to exception', () => {
    const exception = new InvalidRequestException('message', HttpStatus.LOCKED, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    expect(exception.name).toEqual('InvalidRequestException');
    expect(exception.message).toEqual('message');
    expect(exception.statusCode).toEqual(HttpStatus.LOCKED);
    expect(exception.errorCode).toEqual(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  });
});
