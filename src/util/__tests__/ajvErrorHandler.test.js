import ajvErrorHandler from '../ajvErrorHandler';


describe('utill/ajvErrorHandler', () => {
  const ajvValidator = {
    errors:
  [{
    keyword: 'required',
    dataPath: '',
    schemaPath: '#/required',
    params: [Object],
    message: 'should have required property \'date\'',
  }],
  };
  test('should return message based on validator error object', async () => {
    const errorMessage = ajvErrorHandler(ajvValidator);
    expect(errorMessage).toBe(" should have required property 'date'");
  });
});
