import DataTypes from 'sequelize';
import DbManager from '../config/dbManager';

const models = {};
const modelFiles = ['emailNotificationAudit'];

export const modelInitializer = async () => {
  console.info('model initialization start');
  const sequelize = DbManager.getConnectionPool();

  modelFiles.forEach((file) => {
    const sequelizeModel = require(`./${file}.js`).default(
      sequelize,
      DataTypes,
    );
    models[sequelizeModel.name] = sequelizeModel;
  });

  console.info('model initialization complete');

  return 'done';
};

export const getModule = (moduleName) => models[moduleName];
export const getSequelize = () => DbManager.getConnectionPool();
