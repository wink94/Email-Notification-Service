import { getDBConfigValue } from './configHelper';

export default function databaseConfigs() {
  return {
    database: 'email_notification_db',
    password: getDBConfigValue('db_password'),
    host: getDBConfigValue('db_host'),
    user: getDBConfigValue('db_user'),
  };
}
