import {
  CanEmailNotificationModule,
  CanNotificationModule,
  CanSmsNotificationModule,
} from '@can/notification';
import { Module } from '@nestjs/common';
import { AWS_CONFIG } from '../config/aws.config';
import { NOTIFICATION_CONFIG } from '../config/notification.config';
import { SMS_API_CONFIG } from '../config/sms.config';

@Module({
  imports: [
    CanEmailNotificationModule.forRoot({
      from: process.env.EMAIL_FROM,
      aws: AWS_CONFIG,
    }),
    CanSmsNotificationModule.forRoot({ api: SMS_API_CONFIG }),
    CanNotificationModule.forRoot(NOTIFICATION_CONFIG),
  ],
  exports: [CanEmailNotificationModule, CanSmsNotificationModule],
})
export class SharedModule {}
