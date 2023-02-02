import { CanExternalApiOptions } from 'libs/common/src';

export interface CanWhatsappNotificationOptions {
  from?: string;
  api?: CanExternalApiOptions;
}

export interface CanWhatsappOptions  {
    type: 'hsm' | 'template';
    whatsappGateway:'yellow-messenger' | 'default'
    mobile: string;
    message?: string;
    data?: any;
    api?: CanExternalApiOptions;
    triggerName?:string;
}


// export interface CanEmailTemplateOptions {
//   hbsHtmlTemplatePath: string;
//   data?: CanEmailData;
// }

