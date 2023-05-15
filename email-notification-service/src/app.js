import express from 'express';
import serverless from 'serverless-http';
import compression from 'compression';
import HttpStatus from 'http-status-codes';
import morgan from 'morgan';
import { ungzip } from 'pako';
import router from './routes';
import logger from './util/logger';
import errorHandler from './middleware/errorHandler';
import NotFoundException from './exceptions/NotFoundException';
import correlation from './middleware/correlation';
import { createSuccessResponse } from './util/responseGenerator';
import { base64Decode } from './util/helpers';
import contextMiddleware from './middleware/context';
import initializer from './initializer';
import { cognitoAuthorizer } from './middleware/cognitoAuth';

const app = express();

// standard middleware
app.use(contextMiddleware());
app.use(compression());
app.use(express.text({ inflate: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// correlation id handler
app.use(correlation());
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.use(initializer);
}
// HTTP request logger middleware
app.use(morgan('[:req[version]] :method :url', { immediate: true, stream: logger.stream }));
app.use(morgan(':method :url :response-time s', { stream: logger.stream }));

// Root end-point
app.get('/v1/notification/', (req, res) => {
  res.status(HttpStatus.OK).send('email NOTIFICATION MICRO-SERVICE IS WORKING');
});

app.use((req, res, next) => {
  if (req.is('text/plain')) {
    req.body = JSON.parse(ungzip(base64Decode(req.body), { to: 'string' }));
  }
  next();
});

// Health check API
app.get('/v1/notification/healthcheck', (req, res) => {
  const health = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.versions.node,
    nodeEnv: process.env.NODE_ENV,
    deploymentEnv: process.env.STAGE,
    versionId: process.env.VERSION_ID,
  };
  res.status(HttpStatus.OK).json(createSuccessResponse(health));
});

app.use(cognitoAuthorizer());

// Set Express router with API version prefix
app.use('/v1/notification/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new NotFoundException();
  next(err);
});

// error handler
app.use(errorHandler());

// wrap and export express API for serverless use.
exports.serverlessApp = serverless(app);

// export express app for supertest (unit test & integration test) framework use.
exports.app = app;
