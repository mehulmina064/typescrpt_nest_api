import {
    HttpService,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import * as qs from 'qs';

  @Injectable()
  export class EdelweissInsuranceAuthService {
    constructor(
      private httpService: HttpService,
      private configService: ConfigService,
    ) {}
  
    public async getAuthHeaders(username: string , password: string) {
      try {
        const accessData = (
          await this.httpService
            .post<{
              access_token: string;
              expires_in: number;
              token_type: string;
            }>(
              `${this.configService.get(
                'EDELWEISS_INSURANCE_AUTH_BASE_URL',
              )}/oauth2/token`,
              qs.stringify({}),
              {
                auth: {
                  username,
                  password,
                },
                headers: {
                  'content-type':
                    'application/x-www-form-urlencoded;charset=utf-8',
                },
              },
            )
            .toPromise()
        ).data;
        const token = `${accessData.access_token}`;
        const xApiKey = this.configService.get('EDELWEISS_INSURANCE_X_API_KEY');
        return {
          Authorization: token,
          'x-api-key': xApiKey,
        };
      } catch (error) {
        throw new InternalServerErrorException(error ? error.message : error);
      }
    }
  
  }
  