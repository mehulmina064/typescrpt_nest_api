import { DynamicModule, Module } from '@nestjs/common';
import { CAN_PUSH_NOTIFICATION_OPTIONS } from './push.constant';
import { CanPushNotificationService } from './push.service';
import { CanPushNotificationOptions } from './push.type';

@Module({})
export class CanPushNotificationModule {
  static forRoot(options: CanPushNotificationOptions): DynamicModule {
    return {
      module: CanPushNotificationModule,
      providers: [
        {
          provide: CAN_PUSH_NOTIFICATION_OPTIONS,
          useValue: options ? options : {},
        },
        CanPushNotificationService,
      ],
      exports: [CanPushNotificationService],
    };
  }
}
