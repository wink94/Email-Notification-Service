import { mapTemplateRequestBody } from '../templateDTO';

describe('mapTemplateRequestBody', () => {
  it('should map the input JSON correctly', () => {
    const input = {
      templateBody: {
        Template: {
          TemplateName: 'Template21',
          SubjectPart: '{{subject}}',
          HtmlPart: '<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>',
          TextPart: 'Dear {{name}},\r\nYour Are you interested in buying our {{product}}.',
        },
      },
      templateName: 'Template12',
      templateSubject: 'test1-templateSubject',
    };

    const expectedOutput = {
      templateId: null,
      templateName: 'Template12',
      templateSubject: 'test1-templateSubject',
      templateBody: {
        Template: {
          TemplateName: 'Template21',
          SubjectPart: '{{subject}}',
          HtmlPart: '<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>',
          TextPart: 'Dear {{name}},\r\nYour Are you interested in buying our {{product}}.',
        },
      },
    };

    const result = mapTemplateRequestBody(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should map template request body correctly', () => {
    const requestBody = {
      templateId: 1,
      templateName: 'Test Template',
      templateSubject: 'Test Subject',
      templateBody: 'Test Body',
    };

    const expectedResult = {
      templateId: 1,
      templateName: 'Test Template',
      templateSubject: 'Test Subject',
      templateBody: 'Test Body',
    };

    expect(mapTemplateRequestBody(requestBody)).toEqual(expectedResult);
  });
});
