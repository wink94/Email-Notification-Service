import { getDBConfigValue } from './configHelper';

export default function databaseConfigs() {
  return {
    database: 'crms_reporting_db',
    password: getDBConfigValue('db_password'),
    host: getDBConfigValue('db_host'),
    user: getDBConfigValue('db_user'),
  };
}
