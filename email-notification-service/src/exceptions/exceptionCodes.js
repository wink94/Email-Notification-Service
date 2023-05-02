/**
2000 - 2999 -> Downstream API Exceptions
3000 - 3999 -> Configuration Exceptions
4000 - 4999 -> Other
*/

export const GENERAL_EXCEPTION = 4000;

export const REST_CLIENT_EXCEPTION = 2000;
export const API_CENTRAL_EXCEPTION = 2002;
export const ALB_EXCEPTION = 2003;

export const SES_EXCEPTIONS = ['AccountSendingPaused', 'ConfigurationSetDoesNotExist',
  'ConfigurationSetSendingPaused', 'MailFromDomainNotVerified', 'MessageRejected',
  'TemplateDoesNotExist', 'MissingRequiredParameter', 'InvalidRenderingParameter',
  'MissingRenderingAttribute'];
