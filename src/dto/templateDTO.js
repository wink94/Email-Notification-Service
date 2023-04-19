export function mapTemplateRequestBody(data) {
  return {
    tempalteId: data.tempalteId ? data.tempalteId : null,
    templateName: data.templateName,
    templateSubject: data.templateSubject,
    templateBody: data.templateBody,
  };
}
