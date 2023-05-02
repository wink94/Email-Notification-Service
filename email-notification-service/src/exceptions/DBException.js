import HttpStatus from 'http-status-codes';
import ApiException from './ApiException';

export default class DBException extends ApiException {
  constructor(
    message = 'DB exception',
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, statusCode, errorCode);
    this.name = 'DBErrorException';
  }
}
