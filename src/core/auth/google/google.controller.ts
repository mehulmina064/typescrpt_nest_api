import { Controller, Get, Query } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller()
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get('auth/google/login-url')
  authenticateUser() {
    const loginUrl = this.googleService.getLoginUrl();
    return { loginUrl };
  }

  @Get('auth/google/redirect')
  async loginRedirect(@Query('code') code: string) {
    const loginResponse = await this.googleService.getLoginResponse(code);
    const profile = await this.googleService.getUserProfile(
      loginResponse.access_token,
    );
    return { profile };
  }
}
