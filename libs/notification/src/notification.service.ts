import { CanTextParserService } from 'libs/common/src';
import { Inject, Injectable } from '@nestjs/common';
import { CanEmailNotificationService } from './email/email.service';
import { CanEmailOptions } from './email/email.type';
import { CAN_NOTIFICATION_OPTIONS } from './notification.constant';
import {
  CanNotificationOptions,
  CanNotificationOptionsItem,
  CanNotificationSendOptions,
} from './notification.type';
import { CanSmsNotificationService } from './sms/sms.service';
import { CanSmsOptions } from './sms/sms.type';
import { CanWhatsappNotificationService } from './whatsapp/whatsapp.service';
import { CanWhatsappOptions } from './whatsapp/whatsapp.type';
import { CanFirebasePushNotificationOptions } from './push/push.type';
import { CanPushNotificationService } from './push/push.service';

@Injectable()
export class CanNotificationService {
  constructor(
    @Inject(CAN_NOTIFICATION_OPTIONS)
    private notificationOptions: CanNotificationOptions[],
    private smsNotificationService: CanSmsNotificationService,
    private emailNotificationService: CanEmailNotificationService,
    private whatsappNotificationService:CanWhatsappNotificationService,
    private pushNotificationService: CanPushNotificationService,
    private textParserService: CanTextParserService,
  ) {}

  async sendNotification(options: CanNotificationSendOptions) {
    const config = this.findTriggerData<CanNotificationOptionsItem>(
      options.category,
      options.trigger,
    );
    const response  = {}
    if (options.sms && config.sms) {
      const data = options.data
        ? { ...(config.data ? config.data : {}), ...options.data }
        : {};
      const smsConfig = config.sms;
      const mappedSmsConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
        CanSmsOptions[]
      >({ ...data }, JSON.stringify(smsConfig));
      mappedSmsConfig.forEach(msc => {
        msc.mobile = options.sms.mobile;
     
      });
      response['sms'] = await this.smsNotificationService.sendSms(mappedSmsConfig);
    }
    if (options.email && config.email) {
      const data = options.data
        ? { ...(config.data ? config.data : {}), ...options.data }
        : {};
      const emailConfig = config.email;
      let mappedEmailConfig = [...emailConfig];
      mappedEmailConfig.forEach(mec => {
        mec.to = options.email.to;
        if (mec.template) {
          mec.template.data = {
            ...data,
          };
        }
      });
      mappedEmailConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
        CanEmailOptions[]
      >({ ...data }, JSON.stringify(emailConfig));
      response['email'] = await this.emailNotificationService.sendEmail(mappedEmailConfig);
    }
    if(options.whatsapp && config.whatsapp){
      const data = options.data
      ? { ...(config.data ? config.data : {}), ...options.data }
      : {};
 
    const whatsappConfig = config.whatsapp;
    const mappedWhatsappConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
    CanWhatsappOptions[]
    >({ ...data }, JSON.stringify(whatsappConfig));
    mappedWhatsappConfig.forEach(msc => {
      msc.mobile = options.whatsapp.mobile;
      msc.data =  data
      msc.triggerName = options.trigger.toLowerCase()
    });
     response['whatapp'] = await this.whatsappNotificationService.sendMessage(mappedWhatsappConfig)
    }
    if(options.push && config.push){
      const data = options.data
      ? { ...(config.data ? config.data : {}), ...options.data }
      : {};
      const pushConfig = config.push;
      let mappedPushConfig = pushConfig;
      // mappedPushConfig.forEach(mec => {
      //   mec.to = options.email.to;
      //   if (mec.template) {
      //     mec.template.data = {
      //       ...data,
      //     };
      //   }
      // });
      mappedPushConfig.android.deviceId = options.push.deviceId
      mappedPushConfig.android.push.data = data
      mappedPushConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
      CanFirebasePushNotificationOptions
      >({ ...data }, JSON.stringify(pushConfig));
      response['push'] = await this.pushNotificationService.sendPushNotification(mappedPushConfig)
    }
    return response;
  }

  findTriggerData<T>(
    category: string,
    trigger: string,
    type?: 'sms' | 'email' | 'push' | 'whatsapp',
  ): T {
    const categories = this.notificationOptions.find(
      option => option.category === category,
    );
    const config = categories.items.find(item => item.trigger.name === trigger);
    if (type) {
      return config[type] as any;
    }
    return config as any;
  }
}
