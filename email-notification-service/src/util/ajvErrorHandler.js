// Return error message based on the ajv errors
export default function ajvErrorHandler(validate) {
  return `${validate.errors[0].dataPath} ${validate.errors[0].message}`;
}
