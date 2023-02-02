import { CanEmailOptions } from './email/email.type';
import { CanFirebasePushNotificationOptions } from './push/push.type';
import { CanSmsOptions } from './sms/sms.type';
import { CanWhatsappOptions } from './whatsapp/whatsapp.type';

export interface CanNotificationOptions {
  category: string;
  items: CanNotificationOptionsItem[];
}

export interface CanNotificationOptionsItem {
  trigger: CanTriggerParams;
  sms?: CanSmsOptions[];
  push?: CanFirebasePushNotificationOptions;
  email?: CanEmailOptions[];
  data?: CanNotificationData;
  whatsapp?:CanWhatsappOptions[];
}

export interface CanTriggerParams {
  name: string;
  description?: string;
}

export interface CanNotificationSendOptions {
  category: string;
  trigger: string;
  data?: CanNotificationData;
  sms?: CanNotificationSMSSendParams;
  email?: CanNotificationEmailSendParams;
  whatsapp?:CanNotificationWhatsappSendParams;
  push?: CanNotificationPushSendParams;
}

export interface CanNotificationData {
  [key: string]: any;
  whatsappData?: CanWhatsappData[]
}

export interface CanWhatsappData{
  default : string;
}
export interface CanNotificationSMSSendParams {
  mobile: string;
}

export interface CanNotificationEmailSendParams {
  to: string[];
}

export interface CanNotificationWhatsappSendParams{
  mobile : string;
}


export interface CanNotificationPushSendParams{
  deviceId:string;
}