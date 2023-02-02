import { CanExternalApiOptions } from '@can/common';

export const EMAIL_API_CONFIG: CanExternalApiOptions = {
  url: `${process.env.EDELWEISS_INSURANCE_API_BASE_URL}/email/sendEmail`,
  method: 'POST'
};
