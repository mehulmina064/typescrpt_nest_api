import { Inject, Injectable } from '@nestjs/common';
import { CAN_PUSH_NOTIFICATION_OPTIONS } from './push.constant';
import {
  CanPushNotificationOptions,
  CanPushNotificationMessagingDevicesResponse,
  CanFirebasePushNotificationOptions,
} from './push.type';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class CanPushNotificationService {
  private firebaseAndroidAdmin = firebaseAdmin;
  private firebaseIosAdmin = firebaseAdmin;
  private isAndroid = false;
  private isIos = false;

  constructor(
    @Inject(CAN_PUSH_NOTIFICATION_OPTIONS)
    private firebaseNotificationOptions: CanPushNotificationOptions,
  ) {
    if (firebaseNotificationOptions.android) {
      this.isAndroid = true;
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          this.firebaseNotificationOptions.android.credentials,
        ),
        databaseURL: this.firebaseNotificationOptions.android.databaseUrl,
      });
    }
    // if (firebaseNotificationOptions.ios) {
    //   this.isIos = true;
    //   this.firebaseIosAdmin.initializeApp(
    //     {
    //       credential: firebaseAdmin.credential.cert(
    //         this.firebaseNotificationOptions.ios.credentials,
    //       ),
    //       databaseURL: this.firebaseNotificationOptions.ios.databaseUrl,
    //     },
    //     'ios',
    //   );
    // }

    if (!this.isAndroid && !this.isIos) {
      throw new Error(
        'Android or iOS configuration is required in order to initialize firebase notification module!',
      );
    }
  }

  async sendPushNotification(
    options: CanFirebasePushNotificationOptions,
  ): Promise<CanPushNotificationMessagingDevicesResponse[]> {
    try {
      if (!options.android && !options.ios) {
        throw new Error(
          'Android or iOS configuration is required in order to send push notification!',
        );
      }
      const responseData = []
      const response: CanPushNotificationMessagingDevicesResponse[] = [];
      if (this.isAndroid && options.android) {
        const res = await firebaseAdmin
          .messaging()
          .sendToDevice(
            options.android.deviceId,
            options.android.push,
            options.android.options,
          );
          response.push(res);
          responseData.push({res : res, param:  options.android.push, messageId:res.results[0].messageId, isError : res.failureCount > 0 });

        // response.push(
        //   await firebaseAdmin
        //     .messaging()
        //     .sendToDevice(
        //       options.android.deviceId,
        //       options.android,
        //       options.android.options,
        //     ),
        // );
      }
      // if (this.isIos && options.ios) {
      //   response.push(
      //     await this.firebaseIosAdmin
      //       .messaging()
      //       .sendToDevice(
      //         options.ios.deviceId,
      //         options.ios,
      //         options.ios.options,
      //       ),
      //   );
      // }
      return responseData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
