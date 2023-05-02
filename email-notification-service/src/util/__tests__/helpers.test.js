import {
  base64Decode, base64Encode, sleep, awsRetryConfigGenerator,
} from '../helpers';

test('should return decoded base 64 string', async () => {
  expect(base64Decode('YWJjZA==')).toEqual('abcd');
});

test('should return encoded base 64 string', async () => {
  expect(base64Encode('abcd')).toEqual('YWJjZA==');
});

test('sleep shoudl be defined', async () => {
  expect(sleep(0)).toBeDefined();
});

describe('util/helper: awsRetryConfigGenerator', () => {
  test('awsRetryConfigGenerator with default values', () => {
    const configs = awsRetryConfigGenerator();
    expect(
      configs,
    ).toEqual({
      maxAttempts: 3,
      retryStrategy: {
        maxAttemptsProvider: expect.any(Function),
        mode: 'standard',
        retryDecider: expect.any(Function),
        delayDecider: expect.any(Function),
        retryQuota: {
          hasRetryTokens: expect.any(Function),
          retrieveRetryTokens: expect.any(Function),
          releaseRetryTokens: expect.any(Function),
        },
      },
    });
    expect(configs.retryStrategy.retryDecider({})).toBe(true);
    expect(configs.retryStrategy.retryDecider({ $metadata: { httpStatusCode: 100 } })).toBe(true);
    expect(configs.retryStrategy.retryDecider({ $metadata: { httpStatusCode: 450 } })).toBe(false);
    expect(configs.retryStrategy.retryDecider({ $metadata: { httpStatusCode: 500 } })).toBe(true);
  });

  test('awsRetryConfigGenerator with given values', async () => {
    const configs = awsRetryConfigGenerator(
      {
        maxAttempts: 1,
        backOffRatio: 1.5,
        initialDelay: 1000,
      },
    );
    expect(
      configs,
    ).toEqual({
      maxAttempts: 1,
      retryStrategy: {
        maxAttemptsProvider: expect.any(Function),
        mode: 'standard',
        retryDecider: expect.any(Function),
        delayDecider: expect.any(Function),
        retryQuota: {
          hasRetryTokens: expect.any(Function),
          retrieveRetryTokens: expect.any(Function),
          releaseRetryTokens: expect.any(Function),
        },
      },
    });

    expect(configs.retryStrategy.delayDecider(100, 1)).toEqual(1000);
    expect(configs.retryStrategy.delayDecider(100, 2)).toEqual(1500);
    const maxAttempts = await configs.retryStrategy.maxAttemptsProvider();
    expect(maxAttempts).toEqual(1);
  });
});
