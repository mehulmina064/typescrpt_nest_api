import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

export interface CanPushNotificationOptions {
  android?: {
    credentials: CanPushNotificationServiceAccount;
    databaseUrl?: string;
  };
  ios?: {
    credentials: CanPushNotificationServiceAccount;
    databaseUrl: string;
  };
}

export interface CanPushNotificationServiceAccount extends ServiceAccount {}

export type CanFirebasePushNotificationOptions = {
  default?: string;
  android?: {
    deviceId: string | string[];
    push: {
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
    options?: CanPushNotificationMessagingOptions;
  };
  ios?: {
    deviceId: string;
    push: {
      notification?: {
        title?: string;
        subtitle?: string;
        body?: string;
        sound?: string;
        badge?: string;
        click_action?: string;
      };
      data?: any;
    };
    options?: CanPushNotificationMessagingOptions;
  };
};

export interface CanPushNotificationMessagingOptions
  extends admin.messaging.MessagingOptions {}

export interface CanPushNotificationMessagingDevicesResponse
  extends admin.messaging.MessagingDevicesResponse {}
