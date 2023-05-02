import ExtendableError from 'es6-error';

export default class ApiException extends ExtendableError {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.name = 'ApiException';
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
