export function mapTemplateRequestBody(data) {
  return {
    templateId: data.templateId ? data.templateId : null,
    templateName: data.templateName,
    templateSubject: data.templateSubject,
    templateBody: data.templateBody,
  };
}
