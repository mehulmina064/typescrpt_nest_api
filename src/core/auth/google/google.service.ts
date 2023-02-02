import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'query-string';

@Injectable()
export class GoogleService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  getLoginUrl() {
    const stringifiedParams = queryString.stringify({
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      redirect_uri: this.configService.get('GOOGLE_REDIRECT_URL'),
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    return googleLoginUrl;
  }

  async getLoginResponse(redirectionCode: string) {
    const body = {
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      redirect_uri: this.configService.get('GOOGLE_REDIRECT_URL'),
      grant_type: 'authorization_code',
      code: redirectionCode,
    };
    const { data } = await this.httpService
      .post(`https://oauth2.googleapis.com/token`, body)
      .toPromise();
    return data;
  }

  async getUserProfile(accessToken: string) {
    const { data } = await this.httpService
      .get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();
    return data;
  }
}
