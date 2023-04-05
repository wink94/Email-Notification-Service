import { runWithRequestContext, requestContextGet, requestContextSet } from '../requestContext';

beforeAll(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('util: requestContext', () => {
  test('returns undefined when key is not found', async () => {
    runWithRequestContext(() => {
      expect(requestContextGet('any')).not.toBeDefined();
    });
  });

  test('maintains unique value with in the RequestContext ', async () => {
    runWithRequestContext(() => {
      requestContextSet('key1', 'value1');
      expect(requestContextGet('key1')).toBe('value1');
    });
    runWithRequestContext(() => {
      requestContextSet('key2', 'value2');
      expect(requestContextGet('key2')).toBe('value2');
    });
  });

  test('maintains unique value with in the nested RequestContext ', async () => {
    runWithRequestContext(() => {
      requestContextSet('key1', 'value1');
      expect(requestContextGet('key1')).toBe('value1');
      runWithRequestContext(() => {
        requestContextSet('key2', 'value2');
        expect(requestContextGet('key2')).toBe('value2');
      });
      requestContextSet('key1', 'value1');
      expect(requestContextGet('key1')).toBe('value1');
    });
  });

  test('does not store or return context outside of RequestContext ', async () => {
    requestContextSet('any', 'value');
    expect(requestContextGet('any')).not.toBeDefined();
  });
});
