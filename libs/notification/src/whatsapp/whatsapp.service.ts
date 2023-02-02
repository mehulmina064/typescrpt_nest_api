import { HttpService, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CAN_WHATSAPP_NOTIFICATION_OPTIONS } from './whatsapp.constant';
import { CanWhatsappNotificationOptions, CanWhatsappOptions } from './whatsapp.type';

@Injectable()
export class CanWhatsappNotificationService {

    constructor(
        @Inject(CAN_WHATSAPP_NOTIFICATION_OPTIONS)
        private whatsappNotificationOptions: CanWhatsappNotificationOptions,
        private httpService: HttpService,
      ) {}

      async sendMessage(params: CanWhatsappOptions[]) {
        const whatsappResponse: any[] = [];
        if (params && params.length) {
          for (let i = 0; i < params.length; i++) {
            const param = params[i];
            param.api.data = {
              ...param.api.data,
              to: '91'+param.mobile,
              type: param.type,
            };
            param.api.data[param.type] = param.api.data[param.type]
            if(param.type == 'hsm'){
              param.api.data[param.type]['localizable_params'] = param.data && param.data.whatsappData? param.data.whatsappData:[]
              param.api.data[param.type]["element_name"] = param.triggerName
              delete param.api.data['template']
              param.api.data = {
                body: param.api.data
              }
            } 
              
            if(param.type == 'template') {
              param.api.data.ttl = 200000
              param.api.data[param.type]["name"] = param.triggerName
              delete param.api.data['hsm']
              param.api.data = {
                type: param.data.type,
                mime: param.data.mime,
                link: param.data.link,
                body : param.api.data
              }
            }
            const url = param.api.url;
            const body = param.api.data
            const headers = {
              headers : param.api.headers
            }
        
        try {
          whatsappResponse.push(await this.httpService.post(url,body, headers).toPromise());
          // whatsappResponse.push(await this.httpService.request(param.api).toPromise())
          // whatsappResponse.push(await this.httpService.post(param.api.url,{body:param.api.body},{ headers:{'x-auth-token': param.api.token, 'Host':'app.yellowmessenger.com'}}).toPromise());
        } catch (error) {
          throw new Error('ERROR IN SENDING WHATSAPP MESSAGE')
        }
          
          }
        } else {
          throw new Error('whatsapp params is required to send whatsapp notification')
        }
        return whatsappResponse;
      }
}
