/* istanbul ignore file */
export function createResponse(status, message = null, data = null) {
  return { status, message, data };
}

export function createSuccessResponse(data, message) {
  if (data === undefined) throw new Error('"data" must be defined when calling createSuccessResponse.');
  const responseData = {};
  if (message) {
    responseData.message = message;
  }
  return {
    status: 'success',
    data: data ? { ...data, ...responseData } : responseData,
  };
}

export function createErrorResponse(error, message, data) {
  const json = {
    status: 'error',
  };

  const responseData = {};

  if (message) {
    responseData.message = message;
  } else {
    responseData.message = error.message.trim() || 'Internal server error';
  }

  json.data = responseData;

  if (data) {
    json.data = { ...responseData, ...data };
  }
  return json;
}

export function createFailResponse(data) {
  if (data === undefined) throw new Error('"data" must be defined when calling createFailResponse');
  return {
    status: 'fail',
    data,
  };
}
