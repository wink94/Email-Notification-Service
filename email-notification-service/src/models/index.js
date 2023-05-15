import DataTypes from 'sequelize';
import DbManager from '../config/dbManager';
import logger from '../util/logger';

const models = {};
const modelFiles = ['emailNotificationAudit', 'recipient', 'template'];

export const modelInitializer = async () => {
  logger.info('model initialization start');
  const sequelize = DbManager.getConnectionPool();

  modelFiles.forEach((file) => {
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
