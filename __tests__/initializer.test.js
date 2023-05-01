import initializer from '../src/initializer';

jest.mock('../src/config/configHelper.js');
jest.mock('../src/config/dbManager.js');
jest.mock('../src/models/index');

describe('middleware/correlation tests', () => {
  let mockedNext;
  beforeEach(() => {
    mockedNext = jest.fn();
  });

  test('should call next callback with a error ', async () => {
    await initializer({ apiGateway: { context: '' } }, 'mockedRes', mockedNext);
    expect(mockedNext).toHaveBeenCalledWith(expect.anything());
  });
});
