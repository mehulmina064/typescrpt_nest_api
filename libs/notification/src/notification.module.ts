import { CanCommonModule } from 'libs/common/src';
import { DynamicModule, Module } from '@nestjs/common';
import { CanEmailNotificationModule } from './email/email.module';
import { CAN_NOTIFICATION_OPTIONS } from './notification.constant';
import { CanNotificationService } from './notification.service';
import { CanNotificationOptions } from './notification.type';
import { CanSmsNotificationModule } from './sms/sms.module';
import { CanWhatsappNotificationModule } from './whatsapp/whatsapp.module';
import { CanPushNotificationModule } from './push/push.module';
import { FIREBASE_CONFIG } from 'src/apis/config/firebase.config';
import { CommonModule } from 'src/common/common.module';

@Module({})
export class CanNotificationModule {
  static forRoot(options: CanNotificationOptions[]): DynamicModule {
    return {
      imports: [
        CanSmsNotificationModule.forRoot({}),
        CanEmailNotificationModule.forRoot({}),
        CanWhatsappNotificationModule.forRoot({}),
        CanPushNotificationModule.forRoot(FIREBASE_CONFIG),
        CanCommonModule
        // NotificationsModule
      ],
      module: CanEmailNotificationModule,
      providers: [
        {
          provide: CAN_NOTIFICATION_OPTIONS,
          useValue: options ? options : [],
        },
        CanNotificationService,
        
      ],
      exports: [CanNotificationService],
    };
  }
}
