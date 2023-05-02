import HttpStatus, { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import ExtendableError from 'es6-error';
import errorHandler from '../errorHandler';
import ApiException from '../../exceptions/ApiException';
import SESException from '../../exceptions/SESException';
import * as requestContext from '../../util/requestContext';

describe('middleware/errorHandler tests', () => {
  let mockedNext;
  let mockedJson;
  let mockedRes;
  let mockReq;
  let mockInvalidReq;

  beforeEach(() => {
    requestContext.requestContextGet = () => 'test';
    mockedNext = jest.fn();
    mockedJson = jest.fn();
    mockedRes = {
      status: jest.fn(() => ({
        send: mockedJson,
      })),
    };
    mockReq = {};
    mockInvalidReq = {};
  });

  test('should call next callback with err value if it is not an error', () => {
    expect.assertions(3);
    errorHandler()('not_an_error', mockReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith('not_an_error');
    expect(mockedRes.status).not.toHaveBeenCalled();
    expect(mockedJson).not.toHaveBeenCalled();
  });

  test('should call res.status and json with correct params if error is an ApiException', () => {
    expect.assertions(3);

    const error = new ApiException('error', HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
    errorHandler()(error, mockReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'error',
        correlationId: 'test',
      },
      status: 'error',
    });
  });

  test('should consider status code as INTERNAL_SERVER_ERROR when a status code is not given to ApiException', () => {
    expect.assertions(3);

    const error = new ApiException('error', undefined, HttpStatus.NOT_FOUND);
    errorHandler()(error, mockReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'error',
        correlationId: 'test',
      },
      status: 'error',
    });
  });

  test('should consider error code as undefined when an error code is not given to ApiException', () => {
    expect.assertions(3);

    const error = new ApiException('error', HttpStatus.NOT_FOUND, undefined);
    errorHandler()(error, mockReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'error',
        correlationId: 'test',
      },
      status: 'error',
    });
  });

  test('should call res.status with INTERNAL_SERVER_ERROR status code if err is an instance of Error', () => {
    const error = new Error('mockError');
    error.causes = 'mock causes';
    error.code = 'mock code';
    error.path = 'mock path';
    error.stack = 'mock stack';
    errorHandler()(error, mockReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'Internal server error',
        correlationId: 'test',
      },
      status: 'error',
    });
  });

  test('should call res.status with BAD Request if correlation id is missing', () => {
    requestContext.requestContextGet = () => undefined;
    const error = new Error('mockError');
    error.causes = 'mock causes';
    error.code = 'mock code';
    error.path = 'mock path';
    error.stack = 'mock stack';
    errorHandler()(error, mockInvalidReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'Invalid Request',
      },
      status: 'error',
    });
  });
  test('should call res.status with internal servcer error with unkown error ', () => {
    class MockCustomException extends ExtendableError {
      constructor(message, statusCode, errorCode) {
        super(message);
        this.name = 'MockCustomException';
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.stack = undefined;
      }
    }
    const error = new MockCustomException('mockError', INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
    errorHandler()(error, mockReq, mockedRes, mockedNext);
    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'Internal server error',
        correlationId: 'test',
      },
      status: 'error',
    });
  });

  test('should consider error code as undefined when an error code is not given to SESException', () => {
    expect.assertions(3);

    const error = new SESException(new Error(), 'error', HttpStatus.NOT_FOUND, undefined);
    errorHandler()(error, mockReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(error);
    expect(mockedRes.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockedJson).toHaveBeenCalledWith({
      data: {
        message: 'error',
        correlationId: 'test',
      },
      status: 'error',
    });
  });
});
