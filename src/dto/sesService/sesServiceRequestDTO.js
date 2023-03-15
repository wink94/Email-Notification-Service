import Ajv from 'ajv';
import InvalidRequestException from '../../exceptions/InvalidRequestException';
import ajvErrorHandler from '../../util/ajvErrorHandler';
import {
  DATA_DISCREPANCY_TEMPLATE_NAME,
  GL_TEMPLATE_NAME,
  REBATE_TEMPLATE_NAME,
} from '../../util/constant';
import { isValidUSDate, isValidUSDateTime } from '../../util/helpers';

const ajv = new Ajv({ coerceTypes: true, format: 'full' });

ajv.addKeyword('isNotEmpty', {
  type: 'string',
  validate(schema, data) {
    return typeof data === 'string' && data.trim() !== '';
  },
  errors: false,
});

ajv.addKeyword('isValidUSDateString', {
  type: 'string',
  schema: false,
  validate(data) {
    return typeof data === 'string' && isValidUSDate(data);
  },
  errors: false,
});

ajv.addKeyword('isValidUSDateTimeString', {
  type: 'string',
  schema: false,
  validate(data) {
    return typeof data === 'string' && isValidUSDateTime(data);
  },
  errors: false,
});

// validation schema
const schemaDefinition = {
  type: 'object',
  properties: {
    applicationName: {
      type: 'string',
      minLength: 1,
      maxLength: 40,
      pattern: '^([a-zA-Z])[a-zA-Z0-9-_]*$',
    },
    emailCategory: {
      type: 'string',
      minLength: 1,
      maxLength: 40,
      pattern: '^([a-zA-Z])[a-zA-Z0-9-_]*$',
    },
    template: {
      type: 'string',
      minLength: 1,
      pattern: '^([a-zA-Z])[a-zA-Z0-9-_]*$',
    },
    templateData: {
      type: 'object',
    },
    toAddresses: {
      type: 'array',
      minItems: 1,
      items: { format: 'email', type: 'string', isNotEmpty: true },
    },
    ccAddresses: {
      type: 'array',
      items: { format: 'email', type: 'string', isNotEmpty: true },
    },
    bccAddresses: {
      type: 'array',
      items: { format: 'email', type: 'string', isNotEmpty: true },
    },
  },
  required: [
    'applicationName',
    'emailCategory',
    'template',
    'templateData',
    'toAddresses',
  ],
  additionalProperties: false,
};


const validate = ajv.compile(schemaDefinition);


export function sesServiceRequestDTO(data) {
  const valid = validate(data);

  if (!valid) {
    throw new InvalidRequestException(ajvErrorHandler(validate));
  }

  return data;
}
