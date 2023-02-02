import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginEmailDto,
  RecoverDto,
  ResetPasswordDto,
  RecoverResponseDto,
  ResetPasswordResponseDto,
  LoginResponseDto,
  LoginOtpDto,
  GenerateMobileOtpDto,
  TokenResponseDto,
} from './auth.dto';
import { ExceptionService } from 'src/common/services/exceptions/exception.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private exceptionService: ExceptionService,
    private configService: ConfigService
    ) {}

  @Post('login/email')
  @HttpCode(200)
  async loginWithEmail(
    @Body(ValidationPipe) loginDto: LoginEmailDto,
  ): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const token = await this.authService.generateToken(
      await this.authService.validateEmailAndPassword(email, password),
    );
    if (!token) {
      throw new InternalServerErrorException();
    }
    return { token, type: 'Bearer' };
  }

  @Post('generate-otp')
  @HttpCode(200)
  async generateMobileOtp(
    @Body(ValidationPipe) otpDto: GenerateMobileOtpDto,
  ): Promise<RecoverResponseDto> {
    const { mobile } = otpDto;
    await this.authService.getMobileOtp(mobile);
    return { message: `Otp sent successfully on ${mobile}!` };
  }

  @Post('generate-token')
  @HttpCode(200)
  async generateMobileToken(
    @Body(ValidationPipe) otpDto: GenerateMobileOtpDto,
  ): Promise<TokenResponseDto> {
    const { mobile } = otpDto;
    return  this.authService.getTokenByMobile(mobile);
  }

  @Post('validate/login/mobile')
  @HttpCode(200)
  async validateMobileNumber(
    @Body(ValidationPipe) loginDto: LoginOtpDto,
  ): Promise<TokenResponseDto> {
    const { otp, mobile } = loginDto;
    const user = await this.authService._validateMobileAndOtp(mobile, otp);
    if(user){
      const token = await this.authService.generateToken(
        user,
        this.configService.get('JWT_EXP_TIME')
      );
      if (!token) {
        throw new InternalServerErrorException();
      }
      return { token, type: 'Bearer', isUserExist:true};
    }else{
      return { token:null, type: 'Bearer',isUserExist:false };
    }
 
   
  }

  @Post('login/mobile')
  @HttpCode(200)
  async loginWithOtp(
    @Body(ValidationPipe) loginDto: LoginOtpDto,
  ): Promise<LoginResponseDto | any> {
    const { otp, mobile } = loginDto;
    try {
    const user =  await this.authService.validateMobileAndOtp(mobile, otp);
    const token = await this.authService.generateToken(
      user
    );
    if (!token) {
      throw new InternalServerErrorException();
    }
    return { token, type: 'Bearer' };
    } catch (error) {
     return this.exceptionService.handleError(error.message, error.status);
    }
 

  }

  @Post('recover')
  @HttpCode(200)
  async recover(
    @Body(ValidationPipe) recoverDto: RecoverDto,
  ): Promise<RecoverResponseDto> {
    const { email } = recoverDto;
    await this.authService.getResetPasswordOtp(email);
    return { message: `Otp sent successfully on ${email}!` };
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponseDto> {
    const { email, otp, password } = resetPasswordDto;
    const isSuccess = await this.authService.resetPassword(
      email,
      otp,
      password,
    );
    if (!isSuccess) {
      throw new InternalServerErrorException();
    }
    return { message: 'Password updated successfully!' };
  }
}
