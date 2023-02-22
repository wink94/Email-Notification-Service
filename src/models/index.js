import DataTypes from 'sequelize';
import logger from '../util/logger';
import DbManager from '../config/dbManager';

const models = {};
const modelFiles = ['emailNotificationAudit'];

export const modelInitializer = async () => {
  logger.info('model initialization start');
  const sequelize = DbManager.getConnectionPool();

  modelFiles.forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const sequelizeModel = require(`./${file}.js`).default(
      sequelize,
      DataTypes,
    );
    models[sequelizeModel.name] = sequelizeModel;
  });

  logger.info('model initialization complete');

  return 'done';
};

export const getModule = (moduleName) => models[moduleName];
export const getSequelize = () => DbManager.getConnectionPool();
