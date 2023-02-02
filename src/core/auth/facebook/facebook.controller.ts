import { Controller, Get, Query } from '@nestjs/common';
import { FacebookService } from './facebook.service';

@Controller()
export class FacebookController {
  constructor(private facebookService: FacebookService) {}

  @Get('auth/facebook/login-url')
  authenticateUser() {
    const loginUrl = this.facebookService.getLoginUrl();
    return { loginUrl };
  }

  @Get('auth/facebook/redirect')
  async loginRedirect(@Query('code') code: string) {
    const loginResponse = await this.facebookService.getLoginResponse(code);
    const profile = await this.facebookService.getUserProfile(
      loginResponse.access_token,
    );
    return { profile };
  }
}
