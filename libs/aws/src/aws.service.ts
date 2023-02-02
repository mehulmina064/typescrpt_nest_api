import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CAN_AWS_CONFIG } from './aws.constant';
import {
  CanAwsCreateTopicParams,
  CanAwsDeleteTopicParams,
  CanAwsCreateTopicSubscriptionParams,
  CanAwsCreatePlatformEndpointParams,
  CanAwsSendPushNotificationParams,
  CanAwsCredentialsParams,
  CanAwsOptions,
  CanAwsS3UploadParams,
  CanAwsS3DeleteParams,
  CanAwsSendSmsParams,
  CanAwsSendEmailParams,
} from './aws.type';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CanAwsService {
  constructor(@Inject(CAN_AWS_CONFIG) private canAwsConfig: CanAwsOptions) {}

  /**
   * Upload any File to S3
   *
   * @param S3
   * @param params
   */
  public uploadToS3(
    params: CanAwsS3UploadParams,
    S3?: AWS.S3,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    return new Promise(async (resolve, reject) => {
      if (!S3) {
        S3 = await this.getS3Object();
      }
      // Upload to S3
      S3.upload(params)
        .promise()
        .then(data => resolve(data)) // Return Response
        .catch((error: Error) => {
          reject(new Error(error.message));
        }); // Handle Error
    });
  }

  /**
   * Delete any File to S3
   *
   * @param S3
   * @param params
   */
  public deleteFromS3(
    params: CanAwsS3DeleteParams,
    S3?: AWS.S3,
  ): Promise<AWS.S3.DeleteObjectOutput> {
    return new Promise(async (resolve, reject) => {
      if (!S3) {
        S3 = await this.getS3Object();
      }
      // Upload to S3
      S3.deleteObject(params)
        .promise()
        .then(data => resolve(data)) // Return Response
        .catch((error: Error) => {
          reject(new Error(error.message));
        }); // Handle Error
    });
  }

  /**
   * Send SMS Using SNS
   *
   * @param SNS
   * @param params
   */
  public sendSMSThroughSNS(
    params: CanAwsSendSmsParams,
    SNS?: AWS.SNS,
  ): Promise<AWS.SNS.PublishResponse> {
    return new Promise(async (resolve, reject) => {
      if (!SNS) {
        SNS = await this.getSNSObject();
      }
      // Send SMS
      SNS.publish(params)
        .promise()
        .then(data => resolve(data)) // Return Response
        .catch((error: AWS.AWSError) => {
          reject(new Error(error.message));
        }); // Handle Error
    });
  }

  /**
   * Send EMAIL Using SES
   *
   * @param SES
   * @param params
   */
  public sendEmailThroughSES(
    params: CanAwsSendEmailParams,
    // params: AWS.SES.SendEmailRequest,
    SES?: AWS.SES,
  ): Promise<AWS.SES.SendEmailResponse> {
    return new Promise(async (resolve, reject) => {
      if (!SES) {
        SES = await this.getSESObject();
      }
      try {
        // Create Nodemailer Transporter Using SES
        const transporter = nodemailer.createTransport({ SES: SES });
        // Send & Sent Response
        resolve(await transporter.sendMail(params));
      } catch (error) {
        // Handle Error
        reject(new Error(error.message));
      }
      // // Send EMAIL
      // SES.sendEmail(params)
      //   .promise()
      //   .then(data => resolve(data)) // Return Response
      //   .catch((error: AWS.AWSError) => {
      //     reject(new Error(error.message));
      //   }); // Handle Error
    });
  }

  /**
   * Craete Topic for Sending Bulk SMS & Emails
   *
   * @param params : AWSCreateTopicParams
   */
  public async createTopic(
    params: CanAwsCreateTopicParams,
    SNS?: AWS.SNS,
  ): Promise<AWS.SNS.CreateTopicResponse> {
    return new Promise(async (resolve, reject) => {
      if (!SNS) {
        // Create SNS Object
        SNS = await this.getSNSObject();
      }
      // Create Topic Params
      params.name = params.name.replace(' ', '');
      const topicParams: AWS.SNS.CreateTopicInput = {
        Name: params.name.toUpperCase(),
      };
      // Create Topic
      SNS.createTopic(topicParams)
        .promise()
        .then(data => resolve(data))
        .catch((error: AWS.AWSError) => reject(new Error(error.message)));
    });
  }

  public async deleteTopic(
    params: CanAwsDeleteTopicParams,
    SNS?: AWS.SNS,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!SNS) {
        // Create SNS Object
        SNS = await this.getSNSObject();
      }
      // Delete Topic Params
      const topicParams: AWS.SNS.DeleteTopicInput = {
        TopicArn: params.topicArn,
      };
      // Create Topic
      SNS.deleteTopic(topicParams)
        .promise()
        .then(data => resolve(data.$response))
        .catch((error: AWS.AWSError) => reject(new Error(error.message)));
    });
  }

  /**
   * Register Email / SMS to Topic
   *
   * @param params : AWSCreateTopicSubscriptionParams
   */
  public async createTopicSubcription(
    params: CanAwsCreateTopicSubscriptionParams,
    SNS?: AWS.SNS,
  ): Promise<AWS.SNS.SubscribeResponse> {
    return new Promise(async (resolve, reject) => {
      if (!SNS) {
        // Create SNS Object
        SNS = await this.getSNSObject();
      }
      // Create Subscription Params
      const subscriptionParams: AWS.SNS.SubscribeInput = {
        Protocol: params.protocol,
        TopicArn: params.topicArn,
        Endpoint:
          params.protocol === 'sms' ? `+91${params.endpoint}` : params.endpoint,
      };
      // Subscribe to TOPIC
      SNS.subscribe(subscriptionParams)
        .promise()
        .then(data => resolve(data))
        .catch((error: AWS.AWSError) => reject(new Error(error.message)));
    });
  }

  /**
   * Create Platform Endpoint for Push Notification
   *
   * @param params: AWSCreatePlatformEndpointParams
   */
  public async createPlatformEndpoint(
    params: CanAwsCreatePlatformEndpointParams,
    SNS?: AWS.SNS,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      // Create Platform Params
      const createEndpointParams: AWS.SNS.CreatePlatformEndpointInput = {
        PlatformApplicationArn: process.env.AWS_SNS_PUSH_ANDROID_ARN
          ? process.env.AWS_SNS_PUSH_ANDROID_ARN
          : '',
        Token: params.deviceId,
      };
      if (!SNS) {
        // Create SNS Object
        SNS = await this.getSNSObject();
      }
      // Create Platform Endpoint
      SNS.createPlatformEndpoint(createEndpointParams)
        .promise()
        .then(data => resolve(data.EndpointArn)) // Send Response
        .catch((error: AWS.AWSError) => {
          reject(new Error(error.message));
        }); // Handle Error
    });
  }

  /**
   * Send Push Notification Using SNS
   *
   * Send to Android
   *
   * Send to iOS
   *
   * @param params: AWSSendPushNotificationParams
   */
  public async sendPushNotificationUsingSNS(
    params: CanAwsSendPushNotificationParams,
    SNS?: AWS.SNS,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      // Global Vars
      let targetArn = '';
      const message: any = {
        default: params.default,
      };
      // Get Endpoint ARN
      if (params.deviceId) {
        targetArn = await this.createPlatformEndpoint({
          deviceId: params.deviceId,
        });
      }
      // Configure Message Payload
      if (params.android || params.ios) {
        // Android || iOS Push Notification
        message['GCM'] = JSON.stringify({
          notification: params.android
            ? params.android.notification
            : params.ios
            ? params.ios.notification
            : {},
          data: params.android
            ? params.android.data
            : params.ios
            ? params.ios.data
            : {},
        });
      }
      // Configure Push Params
      const pushParams: AWS.SNS.PublishInput = {
        Message: JSON.stringify(message),
        MessageStructure: 'json',
      };
      if (params.topicArn) {
        // Publish to Topic
        pushParams.TopicArn = params.topicArn;
      } else {
        // Publish to individual user
        pushParams.TargetArn = targetArn;
      }
      if (!SNS) {
        // Create SNS Object
        SNS = await this.getSNSObject();
      }
      // Send PUSH
      SNS.publish(pushParams)
        .promise()
        .then(async data => {
          // Send Response
          resolve(data.MessageId);
        }) // Return Response
        .catch((error: AWS.AWSError) => {
          // Handle Error
          if (error.code != 'EndpointDisabled') {
            reject(new Error(error.message));
          }
        });
    });
  }

  /**
   * Get S3 Object
   */
  public async getS3Object(params?: CanAwsCredentialsParams): Promise<AWS.S3> {
    // Set AWS Credentials
    await this._setCredentails(params);
    // Create S3 Object
    const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
    // Return Object
    return S3;
  }

  /**
   * Get SNS Object
   */
  public async getSNSObject(
    params?: CanAwsCredentialsParams,
  ): Promise<AWS.SNS> {
    // Set AWS Credentials
    await this._setCredentails(params);
    // Create SNS Object
    const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
    // Return Object
    return SNS;
  }

  /**
   * GET SES Object
   */
  public async getSESObject(
    params?: CanAwsCredentialsParams,
  ): Promise<AWS.SES> {
    // Set AWS Credentials
    await this._setCredentails(params);
    // Crate SES Object
    const SES = new AWS.SES({ apiVersion: '2010-12-01' });
    // Return Object
    return SES;
  }

  /**
   * SET AWS Credentials
   *
   * @param profile
   * @param region
   */
  private _setCredentails(
    params: CanAwsCredentialsParams,
  ): Promise<AWS.SharedIniFileCredentials> {
    return new Promise((resolve, reject) => {
      if (!params) {
        params = {
          profile: this.canAwsConfig.profile,
          region: this.canAwsConfig.region,
        };
      }

      if (!params.profile) {
        params.profile = this.canAwsConfig.profile;
      }

      if (!params.region) {
        params.region = this.canAwsConfig.region;
      }

      if (!params.profile || !params.region) {
        throw new InternalServerErrorException(
          'Profile && Region is required for setting up aws credentials',
        );
      }
      const credentials = new AWS.SharedIniFileCredentials({
        profile: params.profile,
      });
      // Set Credentials
      AWS.config.credentials = credentials;
      // Set Region
      AWS.config.update({ region: params.region });
      // Resolve Promise
      resolve(credentials);
    });
  }
}
