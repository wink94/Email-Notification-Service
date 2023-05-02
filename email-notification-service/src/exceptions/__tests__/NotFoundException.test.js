import HttpStatus from 'http-status-codes';
import NotFoundException from '../NotFoundException';

describe('exceptions/DataAccessException tests', () => {
  test('should set passed in message and the name to exception with default status code and error code 404', () => {
    const exception = new NotFoundException();
    expect(exception.name).toEqual('NotFoundException');
    expect(exception.message).toEqual('Not Found');
    expect(exception.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(exception.errorCode).toEqual(HttpStatus.NOT_FOUND);
  });
});
