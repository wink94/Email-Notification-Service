import { mapRecipientRequestBody } from '../recipientDTO';

describe('Recipient Mapping', () => {
  it('should map recipient request body correctly', () => {
    const requestBody = {
      recipientId: 1,
      recipientName: 'John Doe',
      toAddresses: ['john.doe@example.com'],
      ccAddresses: ['jane.doe@example.com'],
      bccAddresses: ['jack.doe@example.com'],
    };

    const expectedResult = {
      recipientId: 1,
      recipientName: 'John Doe',
      emailAddresses: {
        toAddresses: ['john.doe@example.com'],
        ccAddresses: ['jane.doe@example.com'],
        bccAddresses: ['jack.doe@example.com'],
      },
    };

    expect(mapRecipientRequestBody(requestBody)).toEqual(expectedResult);
  });

  it('should set recipientId to null if not provided in the request body', () => {
    const requestBody = {
      recipientName: 'John Doe',
      toAddresses: ['john.doe@example.com'],
      ccAddresses: ['jane.doe@example.com'],
      bccAddresses: ['jack.doe@example.com'],
    };

    const expectedResult = {
      recipientId: null,
      recipientName: 'John Doe',
      emailAddresses: {
        toAddresses: ['john.doe@example.com'],
        ccAddresses: ['jane.doe@example.com'],
        bccAddresses: ['jack.doe@example.com'],
      },
    };

    expect(mapRecipientRequestBody(requestBody)).toEqual(expectedResult);
  });
});
