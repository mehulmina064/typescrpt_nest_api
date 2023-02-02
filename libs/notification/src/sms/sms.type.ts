import { CanAwsOptions } from 'libs/aws/src';
import { CanExternalApiOptions } from 'libs/common/src';

export interface CanSmsNotificationOptions {
  aws?: CanAwsOptions;
  api?: CanExternalApiOptions;
}

export interface CanSmsOptions {
  channel: 'aws' | 'api';
  smsGateway:'msg91' | 'default'
  mobile: string;
  message: string;
  type:'template' | 'default';
  templateId?:string;
  data?: CanSmsData;
  aws?: CanAwsOptions;
  api?: CanExternalApiOptions;
}

export interface CanSmsData {
  [key: string]: any;
}
