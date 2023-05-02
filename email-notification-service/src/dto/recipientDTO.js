export function mapRecipientRequestBody(data) {
  return {
    recipientId: data.recipientId ? data.recipientId : null,
    recipientName: data.recipientName,
    emailAddresses: {
      toAddresses: data.toAddresses,
      ccAddresses: data.ccAddresses,
      bccAddresses: data.bccAddresses,
    },
  };
}
