



// Database Configuration
export async function fetchDatabaseConfigs() {

  try {

    const response = [];
    response.Parameters.forEach((element) => {
      const param = element.Name.split(configBaseURL)[1].split('/')[1];
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
