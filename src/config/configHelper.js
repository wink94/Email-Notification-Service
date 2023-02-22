/** @format */

import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';
import { BACK_OFF_RATIO, INITIAL_DELAY, MAX_ATTEMPTS } from '../util/constant';
import { awsRetryConfigGenerator } from '../util/helpers';
import logger from '../util/logger';
import { ENV } from './configs';

const retryConfigs = awsRetryConfigGenerator({
  maxAttempts: MAX_ATTEMPTS,
  backOffRatio: BACK_OFF_RATIO,
  initialDelay: INITIAL_DELAY,
});

const ssmClient = new SSMClient({
  region: 'us-east-1',
  ...retryConfigs,
});

const values = {};
const configBaseURL = `/crms/${ENV}/notification-ms/`;

// Database Configuration
export async function fetchDatabaseConfigs() {
  const params = {
    Path: configBaseURL,
    Recursive: true,
    WithDecryption: true,
  };

  try {
    const command = new GetParametersByPathCommand(params);
    const response = await ssmClient.send(command);
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
    logger.error(error);
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
