import correlation from '../correlation';

describe('middleware/correlation tests', () => {
  let mockedNext;
  let mockedRes;
  const DEFAULT_HEADER_NAME = 'correlation-id';
  beforeEach(() => {
    mockedNext = jest.fn();
    mockedRes = {
      headers: {},
      get: jest.fn((headerName) => mockedRes.headers[headerName]),
      set: jest.fn((headerName, id) => { (mockedRes.headers[headerName] = id); }),
    };
  });

  test('should call next callback after setting correlation id to respond object which coming with the request object', () => {
    const headers = { [DEFAULT_HEADER_NAME]: '123' };
    const req = {
      get: jest.fn((headerName) => headers[headerName]),
    };
    correlation()(req, mockedRes, mockedNext);
    expect(mockedRes.get).toBeDefined();
    expect(mockedRes.get(DEFAULT_HEADER_NAME)).toEqual('123');
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  test('should call next callback after setting new correlation id to respond object when incoming request object has no correlation id.', () => {
    const headers = { [DEFAULT_HEADER_NAME]: undefined };
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    const req = {
      get: jest.fn((headerName) => headers[headerName]),
    };
    correlation()(req, mockedRes, mockedNext);
    expect(req.get(DEFAULT_HEADER_NAME)).toBeUndefined();
    expect(mockedRes.get).toBeDefined();
    expect(mockedRes.get).toBeDefined();
    expect(mockedRes.get(DEFAULT_HEADER_NAME)).toEqual(expect.stringMatching(v4));
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  test('should call next callback after setting correlation id to respond object which coming with the request object with custom header name', () => {
    const CUSTOM_HEADER_NAME = 'crms-correlation-id';
    const headers = { [CUSTOM_HEADER_NAME]: '123' };
    const req = {
      get: jest.fn((headerName) => headers[headerName]),
    };
    correlation({ header: CUSTOM_HEADER_NAME })(req, mockedRes, mockedNext);
    expect(mockedRes.get).toBeDefined();
    expect(mockedRes.get(CUSTOM_HEADER_NAME)).toEqual('123');
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });
});
