import { CanAwsOptions, CanAwsSendEmailParams } from 'libs/aws/src';
import { CanExternalApiOptions } from 'libs/common/src';

export interface CanEmailNotificationOptions {
  from?: string;
  aws?: CanAwsOptions;
  api?: CanExternalApiOptions;
}

export interface CanEmailOptions extends CanAwsSendEmailParams {
  channel: 'aws' | 'api';
  template?: CanEmailTemplateOptions;
  aws?: CanAwsOptions;
  api?: CanExternalApiOptions;
}

export interface CanEmailTemplateOptions {
  hbsHtmlTemplatePath: string;
  data?: CanEmailData;
}

export interface CanEmailData {
  [key: string]: any;
}
