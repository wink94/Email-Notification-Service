import HttpStatus from 'http-status-codes';
import ApiException from './ApiException';

export default class InvalidRequestException extends ApiException {
  constructor(
    message,
    statusCode = HttpStatus.BAD_REQUEST,
    errorCode = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode, errorCode);
    this.name = 'InvalidRequestException';
  }
}
