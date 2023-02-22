import Sequelize from 'sequelize';
import dbConfigs from './databaseConfigs';
import { BACK_OFF_RATIO, INITIAL_DELAY, MAX_ATTEMPTS } from '../util/constant';
import logger from '../util/logger';

export default class DbManager {
  static init(context) {
    const configs = dbConfigs();
    DbManager.poolObj = new Sequelize(
      configs.database,
      configs.user,
      configs.password,
      {
        host: configs.host,
        dialect: 'mysql',
        operatorsAliases: 0,
        logging: false,
        // logging: (sql, ...args) => {
        //   const instance = args.pop();
        //   const benchmark = args.pop();

        //   console.log(sql, benchmark, instance.bind);
        // },
        pool: {
          max: 5,
          min: 0,
          acquire: 60000,
          idle: 0,
          evict: context.getRemainingTimeInMillis(),
        },
        retry: {
          match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
          ],
          name: 'query',
          backoffBase: INITIAL_DELAY,
          backoffExponent: BACK_OFF_RATIO,
          timeout: 60000,
          max: MAX_ATTEMPTS,
          report: (data) => logger.info(data),
        },
      },
    );
  }

  static getConnectionPool() {
    return DbManager.poolObj;
  }

  static async closeConnections() {
    await DbManager.poolObj.connectionManager.close();
  }
}
