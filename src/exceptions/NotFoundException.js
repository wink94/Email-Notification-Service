import HttpStatus from 'http-status-codes';
import ApiException from './ApiException';

export default class NotFoundException extends ApiException {
  constructor(
    message = 'Not Found',
    statusCode = HttpStatus.NOT_FOUND,
    errorCode = HttpStatus.NOT_FOUND,
  ) {
    super(message, statusCode, errorCode);
    this.name = 'NotFoundException';
  }
}
