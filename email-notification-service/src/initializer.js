import logger from './util/logger';
import DbManager from './config/dbManager';
import { modelInitializer } from './models/index';
import { fetchDatabaseConfigs } from './config/configHelper';

/* istanbul ignore next */
let hotStart = true;
/* istanbul ignore next */
export async function configInitializer(context) {
  if (hotStart) {
    logger.info('Initialization start');

    // fetch stage-specific configuration from the AWS SSM
    await fetchDatabaseConfigs();

    // Initiates the DBManager with connection pools
    DbManager.init(context);

    // Database connection
    const sequelize = DbManager.getConnectionPool();
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');

    // // initialize sequelize models
    await modelInitializer();

    logger.info('Initialization complete');

    // application state
    // Change lambda container state
    hotStart = false;
  } else {
    const sequelize = DbManager.getConnectionPool();

    sequelize.connectionManager.initPools();

    // restore `getConnection()` if it has been overwritten by `close()`
    if (Object.prototype.hasOwnProperty.call(sequelize.connectionManager, 'getConnection')) {
      delete sequelize.connectionManager.getConnection;
    }

    logger.info('Warm Start');
  }
}

export default async function initializer(req, res, next) {
  try {
    await configInitializer(req.apiGateway.context);
  } catch (error) {
    logger.error(error);
    next(error);
  }

  next();
}
