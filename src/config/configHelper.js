

const values = {};

// Database Configuration
export async function fetchDatabaseConfigs() {

  try {

    const response = [{Name:'host',Value:'127.0.0.1'},{Name:'user',Value:'root'},{Name:'password',Value:'root'},{Name:'database',Value:'email_notification_db'}];
    response.forEach((element) => {
      const param = element.Name
      switch (param) {
        case 'password':
          values.db_password = element.Value;
          break;
        case 'user':
          values.db_user = element.Value;
          break;
        case 'host':
          values.db_host = element.Value;
          break;
        case 'database':
          values.db_database = element.Value;
          break;
        case 'bccEmailUsers':
          values.audit_emails = element.Value;
          break;
        default:
          break;
      }
    });
    return '';
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export const getDBConfigValue = (key) => {
  if (values[key]) {
    return values[key];
  }
  const msg = `configuration key ${key} not found`;
  logger.error(msg);
  throw new Error(msg);
};
