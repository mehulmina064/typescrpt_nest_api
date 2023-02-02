import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { totp } from 'otplib';

@Injectable()
export class OtpService {
  private secret: string;

  constructor(private configService: ConfigService) {
    totp.options = { step: parseInt(this.configService.get('OTP_EXP_MINUTE')) };
    this.secret = this.configService.get('OTP_SECRET');
  }

  generateOtp() {
    return totp.generate(this.secret);
  }

  verifyOtp(otp: string) {
    const isValid = totp.verify({
      token: otp,
      secret: this.secret,
    });
    return isValid;
  }
}
