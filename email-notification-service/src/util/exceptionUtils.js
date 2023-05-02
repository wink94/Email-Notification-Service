/* istanbul ignore file */
import { v4 as uuidv4 } from 'uuid';
import logger from './logger';
import { GENERAL_EXCEPTION } from '../exceptions/exceptionCodes';

const correlator = require('correlation-id');

export function appendExceptionStack(error) {
  if (error instanceof Error) {
    const { stack } = new Error('exceptionStack');
    // eslint-disable-next-line no-param-reassign
    error.stack += `\nCaused By:\n${stack}`;
    return error;
  }
  return new Error(error);
}

export function exceptionLogger(error) {
  const errorCode = error.errorCode || GENERAL_EXCEPTION;
  // eslint-disable-next-line no-param-reassign
  error.incidentId = uuidv4();
  const correlationId = correlator.getId();
  const {
    code, message, stack, address, dest, errno, info, path, port, syscall, errorDetails, incidentId,
  } = error;
  logger.error(
    {
      code,
      message,
      stack,
      address,
      dest,
      errno,
      info,
      path,
      port,
      syscall,
      errorDetails,
      incidentId,
      correlationId,
      errorCode,
    },
  );
}
