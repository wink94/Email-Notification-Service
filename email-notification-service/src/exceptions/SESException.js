import HttpStatus from 'http-status-codes';
import ApiException from './ApiException';

export default class SESException extends ApiException {
  constructor(
    error = {},
    message = 'Email service error',
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode = error.code || HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, statusCode, errorCode);
    this.name = 'SESException';
    this.causes = error.toString();
  }
}
