import HttpStatus from 'http-status-codes';
import ApiException from '../exceptions/ApiException';
import NotFoundException from '../exceptions/NotFoundException';
import logger from '../util/logger';
import { createErrorResponse } from '../util/responseGenerator';
import { requestContextGet } from '../util/requestContext';

export default function errorHandler() {
  return (err, req, res, next) => {
    if (typeof requestContextGet('correlationId') === 'undefined') {
      if (err instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send(createErrorResponse(err, 'Not Found'));
      }
      return res.status(HttpStatus.BAD_REQUEST).send(createErrorResponse(err, 'Invalid Request'));
    }
    if (err instanceof ApiException) {
      const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

      logger.error(err);
      return res.status(statusCode).send(createErrorResponse(
        err,
        null,
        { correlationId: requestContextGet('correlationId') },
      ));
    }
    if (err instanceof Error) {
      logger.error(err);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(createErrorResponse(err, 'Internal server error', { correlationId: requestContextGet('correlationId') }));
    }
    return next(err);
  };
}
