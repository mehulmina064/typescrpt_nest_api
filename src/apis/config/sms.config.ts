import { CanExternalApiOptions } from '@can/common';

export const SMS_API_CONFIG: CanExternalApiOptions = {
  url: `${process.env.EDELWEISS_INSURANCE_API_BASE_URL}/egi-sms/sendSMS`,
  method: 'POST'
};
