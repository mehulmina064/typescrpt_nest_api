import { CanAwsService } from 'libs/aws/src';
import {
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CAN_SMS_NOTIFICATION_OPTIONS } from './sms.constant';
import { CanSmsNotificationOptions, CanSmsOptions } from './sms.type';
import { EdelweissInsuranceAuthService } from '@can/common/services/edelweiss-insurance/edelweiss-insurance.service';
import { ConfigService } from '@nestjs/config';
import { CanExternalApiOptions } from '@can/common';

@Injectable()
export class CanSmsNotificationService {
  constructor(
    @Inject(CAN_SMS_NOTIFICATION_OPTIONS)
    private smsNotificationOptions: CanSmsNotificationOptions,
    private awsService: CanAwsService,
    private httpService: HttpService,
    private edelweissInsuranceAuthService:EdelweissInsuranceAuthService,
    private configService: ConfigService
  ) {}

  async sendSms(params: CanSmsOptions[]) {
    const smsResponse: any[] = [];
    if (params && params.length) {
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if(param.type == 'template'){
          param.api.data = {
            ...param.api.data,
            sms :[{
              to: [param.mobile],
              message: param.message,
            }],
            DLT_TE_ID : param.templateId
          }
          param.api.headers['Content-Type'] = 'application/json'
        }else{
          param.api.params = {
            ...param.api.params,
            mobiles: param.mobile,
            message: param.message,
          };
        }
        const aws = param.aws ?? this.smsNotificationOptions.aws;
        const api = param.api ?? this.smsNotificationOptions.api;

        if (param.channel === 'aws' && !aws) {
          throw new Error('aws config is required to send sms through aws channel')
        }
        if (param.channel === 'api' && !api) {
          throw new Error('api config is required to send sms through api channel')
        }
        if (param.channel === 'aws' && aws) {
          const SNS = await this.awsService.getSNSObject(aws);
          smsResponse.push(
            await this.awsService.sendSMSThroughSNS(
              { PhoneNumber: param.mobile, Message: param.message },
              SNS,
            ),
          );
        }
        if (param.channel === 'api' && api) {
          try {
            smsResponse.push(await this.sendEdelwiseEmail(api,param));          
          } catch (error) {
            throw new Error('sms params is required to send sms notification')
            
          }
        }
      }
    } else {
      throw new Error('sms params is required to send sms notification')
    }
    return smsResponse;
  }

  private async sendEdelwiseEmail(api: CanExternalApiOptions, param: CanSmsOptions) {
    try {
      const headers = await this.edelweissInsuranceAuthService.getAuthHeaders(this.configService.get(
        'EDELWEISS_INSURANCE_SMS_USERNAME',
      ), this.configService.get(
        'EDELWEISS_INSURANCE_SMS_PASSWORD',
      ));
      api['headers'] = {
        Authorization: headers.Authorization,
        "x-api-key": this.configService.get(
          'EDELWEISS_INSURANCE_SMS_X_API_KEY',
        )
      }
      api['data'] = {
        msgType: "NON-OTP",
        mobileNumber: param.mobile,
        smsText: param.message
      };
      // let response = await axios(reqObj);
      const res = await this.httpService.request(api).toPromise();
      return {res, param, isError :false,error:null};
    } catch (error) {
      return {error, isError: true, res:null, param};

    }
  }
}
