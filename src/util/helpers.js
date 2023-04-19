import { StandardRetryStrategy } from '@aws-sdk/middleware-retry';
import { BACK_OFF_RATIO, INITIAL_DELAY, MAX_ATTEMPTS } from './constant';
import logger from './logger';

export const base64Decode = (data) => Buffer.from(data, 'base64').toString();

export const base64Encode = (data) => Buffer.from(data).toString('base64');

// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const awsRetryConfigGenerator = (options) => {
  const retryAttempts = options?.maxAttempts || MAX_ATTEMPTS;
  const backOffRatio = options?.backOffRatio || BACK_OFF_RATIO;
  const initialDelay = options?.initialDelay || INITIAL_DELAY;

  const retryOptions = {
    retryDecider: (err) => {
      const errorStatus = err?.$metadata?.httpStatusCode || 0;
      return errorStatus < 400 || errorStatus > 499;
    },
    delayDecider: (delayBase, attempt) => {
      const delay = attempt === 1
        ? initialDelay
        : initialDelay * backOffRatio * (attempt - 1);
      logger.info(
        `Api call failed with recoverable error. Retry attempt ${attempt} will initiate in ${delay} milliseconds`,
      );
      return delay;
    },
  };

  return {
    maxAttempts: retryAttempts,
    retryStrategy: new StandardRetryStrategy(
      async () => retryAttempts,
      retryOptions,
    ),
  };
};
