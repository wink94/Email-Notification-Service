import CognitoExpress from 'cognito-express';
import HttpStatus from 'http-status-codes';
import logger from '../util/logger';
import { PoolData } from '../util/constant';
import { createErrorResponse } from '../util/responseGenerator';
import { requestContextSet } from '../util/requestContext';

export const setResponseForCognitoValidation = (
  error,
  res,
  next,
  authorizationToken,
) => {
  if (
    error === 'Not a valid JWT token'
    || error.toString() === 'TokenExpiredError: jwt expired'
  ) {
    logger.info(`${error.toString()} | JWT Token: ${authorizationToken}`);
    if (error === 'Not a valid JWT token') {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .send(createErrorResponse(null, error));
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send(createErrorResponse(error));
    }
  } else {
    next(error);
  }
};

export const cognitoAuthorizer = () => async (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  // fail if token not present in header.
  if (!authorizationToken) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .send(createErrorResponse(null, 'Access Token missing from header'));
  } else {
    const cognitoExpress = new CognitoExpress({
      region: 'us-east-1',
      cognitoUserPoolId: PoolData.UserPoolId,
      tokenUse: 'id',
      tokenExpiration: 3600000,
    });

    await cognitoExpress.validate(authorizationToken, (error, response) => {
      logger.info(
        '🚀 ~ file: cognitoAuth.js:48 ~ awaitcognitoExpress.validate ~ response:',
        response,
      );
      // if API is not authenticated, Return 401 with error message.
      if (error) {
        setResponseForCognitoValidation(error, res, next, authorizationToken);
      } else {
        // else API has been authenticated. Proceed.
        requestContextSet('authContext', response);
        req.context = response;
        next();
      }
    });
  }
};
