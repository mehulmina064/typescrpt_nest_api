import Mail from 'nodemailer/lib/mailer';

export type CanAwsOptions = {
  profile: string;
  region: string;
};

export type CanAwsCreateTopicParams = {
  name: string;
  profile?: string;
  region?: string;
};

export type CanAwsDeleteTopicParams = {
  topicArn: string;
  profile?: string;
  region?: string;
};

export type CanAwsCreateTopicSubscriptionParams = {
  protocol: 'sms' | 'email' | 'application';
  topicArn: string;
  endpoint: string; // sms : Mobile Number | email : EMAIL | application : Device Id
  profile?: string;
  region?: string;
};

export type CanAwsCreatePlatformEndpointParams = {
  deviceId: string;
  profile?: string;
  region?: string;
};

export type CanAwsCredentialsParams = {
  profile: string;
  region: string;
};

export type CanAwsSendPushNotificationParams = {
  deviceId?: string;
  topicArn?: string;
  default?: string;
  android?: {
    notification?: {
      title?: string;
      body?: string;
      android_channel_id?: string;
      icon?: string;
      sound?: string;
      tag?: string;
      color?: string;
      click_action?: string;
    };
    data?: any;
  };
  ios?: {
    notification?: {
      title?: string;
      subtitle?: string;
      body?: string;
      sound?: string;
      badge?: string;
      click_action?: string;
    };
    data: any;
  };
};

export interface CanAwsS3UploadParams extends AWS.S3.PutObjectAclRequest {}
export interface CanAwsS3DeleteParams extends AWS.S3.DeleteObjectRequest {}
export interface CanAwsSendSmsParams extends AWS.SNS.PublishInput {}
export interface CanAwsSendEmailParams extends Mail.Options {}
