export const BASE_URL = "http://localhost:3031/v1";

export const recipientEmailConverter = (data) => {
  return data.map((obj) => {
    console.log("🚀 ~ file: constant.js:5 ~ returndata.map ~ obj:", obj)
    
    return {...obj,
    emailAddresses: `TO: ${obj.emailAddresses?.toAddresses?.join()} | CC: ${obj.emailAddresses?.ccAddresses?.join()} | BCC: ${obj.emailAddresses?.bccAddresses?.join()}`,}
  });
};
