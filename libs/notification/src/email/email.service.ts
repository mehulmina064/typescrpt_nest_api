import { CanAwsService } from 'libs/aws/src';
import {
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CAN_EMAIL_NOTIFICATION_OPTIONS } from './email.constant';
import { CanEmailNotificationOptions, CanEmailOptions } from './email.type';
import path = require('path');
import hbs = require('hbs');
import fs = require('fs');
import { CanExternalApiOptions } from '@can/common';
import { EdelweissInsuranceAuthService } from '@can/common/services/edelweiss-insurance/edelweiss-insurance.service';
import { ConfigService } from '@nestjs/config';
const FormData = require("form-data");
@Injectable()
export class CanEmailNotificationService {
  constructor(
    @Inject(CAN_EMAIL_NOTIFICATION_OPTIONS)
    private emailNotificationOptions: CanEmailNotificationOptions,
    private awsService: CanAwsService,
    private httpService: HttpService,
    private edelweissInsuranceAuthService:EdelweissInsuranceAuthService,
    private configService: ConfigService

  ) {}

  async sendEmail(params: CanEmailOptions[]) {
    const emailResponse: any[] = [];
    if (params && params.length) {
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        const aws = param.aws ?? this.emailNotificationOptions.aws;
        const api = param.api ?? this.emailNotificationOptions.api;
        if (param.channel === 'aws' && !aws) {
          throw new InternalServerErrorException(
            new Error(
              'aws config is required to send email through aws channel',
            ),
          );
        }
        if (param.channel === 'api' && !api) {
          throw new InternalServerErrorException(
            new Error(
              'api config is required to send email through api channel',
            ),
          );
        }
        // const from = param.from ?? this.emailNotificationOptions.from;
        // if (!from) {
        //   throw new InternalServerErrorException(
        //     new Error('from is required to send email notification'),
        //   );
        // }
        // param.from = from;
        if (param.template) {
          const template = param.template;
          const htmlPath = path.join(
            __dirname,
            '..',
            template.hbsHtmlTemplatePath,
          );
          const templateString = fs.readFileSync(htmlPath, 'utf8');
          const compiledTemplate = hbs.compile(templateString);
          const htmlTemplate = compiledTemplate(param.template.data);
          param.html = htmlTemplate;
          if (param.channel === 'aws' && aws) {
            const SES = await this.awsService.getSESObject(aws);
            emailResponse.push(
              await this.awsService.sendEmailThroughSES(param, SES),
            );
          }
          if (param.channel === 'api' && api) {
            emailResponse.push(await this.sendEdelwiseEmail(api,param));
          }
        } else {
          emailResponse.push(await this.awsService.sendEmailThroughSES(param));
        }
      }
    } else {
      throw new InternalServerErrorException(
        new Error('email params is required to send email notification'),
      );
    }
    return emailResponse;
  }

  private async sendEdelwiseEmail(api:CanExternalApiOptions,param: CanEmailOptions){
    try {   
    const form = new FormData();
    const objMailBody = {
      to: param.to,
      subject: param.subject,
      emailBody: param.html,
      attachmentPresent: "Y",
    };
    const headers = await this.edelweissInsuranceAuthService.getAuthHeaders(this.configService.get(
      'EDELWEISS_INSURANCE_USERNAME',
    ),this.configService.get(
      'EDELWEISS_INSURANCE_PASSWORD',
    ));
    form.append("body", JSON.stringify(objMailBody));
    // let reqObj = {
    //   method: "post",
    //   url: process.env.EMAIL_URL,
    //   headers: {
    //     Authorization: headers.Authorization,
    //     "x-api-key": this.configService.get(
    //       'EDELWEISS_INSURANCE_EMAIL_X_API_KEY',
    //     ),
    //     ...form.getHeaders(),
    //   },
    //   data: form,
    // };
    api['headers'] = {
      Authorization: headers.Authorization,
      "x-api-key": this.configService.get(
        'EDELWEISS_INSURANCE_EMAIL_X_API_KEY',
      ),
      ...form.getHeaders()
    }
    api['data'] = form;
    // let response = await axios(reqObj);
       const res =  await this.httpService.request(api).toPromise();
       console.log(res);
       return {res, param, isError :false,error:null};
      } catch (error) {
        return {error, isError: true, res:null, param};
  
    }
  }
}
