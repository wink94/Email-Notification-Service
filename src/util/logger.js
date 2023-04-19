import winston from 'winston';

import { requestContextGet } from './requestContext';

const addCorrelation = winston.format((data) => {
  const { timestamp, level, ...rest } = data;

  return {
    timestamp,
    level,
    correlationId: requestContextGet('correlationId'),
    ...rest,
  };
});
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        addCorrelation(),
        winston.format.json(),
      ),
    }),
  ],
});

const internalError = (errorMessage) => {
  if (errorMessage instanceof Error) {
    const errorInformation = {};
    errorInformation.error = errorMessage.toString();
    if (errorMessage.stack !== undefined) errorInformation.stack = errorMessage.stack;
    if (errorMessage.code !== undefined) errorInformation.code = errorMessage.code;
    if (errorMessage.path !== undefined) errorInformation.path = errorMessage.path;
    if (errorMessage.causes !== undefined) errorInformation.causes = errorMessage.causes;
    logger.error(errorInformation);
  } else {
    logger.error(errorMessage);
  }
};

export default {
  error: (error) => internalError(error),
  info: (...params) => logger.info(...params),
  debug: (...params) => logger.debug(...params),
  stream: {
    write(message) {
      logger.info(message.trim());
    },
  },
};
