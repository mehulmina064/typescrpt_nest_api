import { Injectable, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { UserService } from '../user/user.service';
import { comparePassword } from '../../common/utils/bcrypt';
import { User } from '../user/user.model';
import * as moment from 'moment';
import { OtpService } from '../../common/services/otp/otp.service';
import {
  CanEmailNotificationService,
  CanNotificationService,
  CanSmsNotificationService,
} from '@can/notification';
import { SMS_API_CONFIG } from 'src/apis/config/sms.config';
import { ConfigService } from '@nestjs/config';
import { ApiService } from '@can/common/services/api/api.service';
import { CanExternalApiOptions } from '@can/common/types/external-api.type';
import { ProdoApiRes } from 'src/common/types/common.type';
import { Boolean } from 'aws-sdk/clients/batch';
import { ExceptionService } from 'src/common/services/exceptions/exception.service';
import { TokenResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private emailService: CanEmailNotificationService,
    private otpService: OtpService,
    private smsService: CanSmsNotificationService,
    private notificationService: CanNotificationService,
    private configService: ConfigService,
    private apiService: ApiService,
    private exceptionService: ExceptionService

  ) {}

  /**
   * Validate Email and Compare the Password
   *
   * @param email: string
   * @param password: string
   *
   * @return null | User
   */
  async validateEmailAndPassword(email: string, password: string) {
    // Validate User
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException();
    }
    // Compare Password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new ForbiddenException();
    }
    // Return User Data
    return user;
  }

  /**
   * Validate Mobile and OTP
   *
   * @param mobile: string
   * @param otp: string
   *
   * @return null | User
   */
  async validateMobileAndOtp(mobile: string, otp: string) {
    // Validate User
    const user = await this.userService.findOne({
      where: {
        mobile,
        // loginOtp: otp,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }
    try {
      await this.verifyOtp(mobile, otp);
      // Return User Data
      return user;
   } catch (error) {
     return error
   }
  }

    /**
   * Validate Mobile and OTP
   *
   * @param mobile: string
   * @param otp: string
   *
   * @return null | User
   */
     async _validateMobileAndOtp(mobile: string, otp: string) {
      // Validate User
      const user = await this.userService.findOne({
        where: {
          mobile
        },
      });
      // Reset OTP in DB
    //  if (user) {
    //   await this.userService.updateById(user.id, {
    //     loginOtp: null,
    //   });
    //  }
   
     try {
        await this.verifyOtp(mobile, otp);
        // Return User Data
        return user;
     } catch (error) {
       return this.exceptionService.handleError(error.message, error.response.status);
     }
 
    }
  

  /**
   *
   * @param email : string
   *
   * @return string
   */
  async getResetPasswordOtp(email: string): Promise<string> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException();
    }
    const resetPasswordOtpExpiresIn = moment()
      .add('minutes', 10)
      .toISOString(); // 10 Min from Current Time
    const resetPasswordOtp = this.otpService.generateOtp();
    await this.userService.updateById(user.id, {
      resetPasswordOtpExpiresIn,
      resetPasswordOtp,
    });
    // this.notificationService.sendNotification({
    //   category: 'Users',
    //   trigger: 'FORGOT_PASSWORD',
    //   data: {
    //     firstName: user.firstName,
    //     otp: resetPasswordOtp,
    //   },
    //   email: {
    //     to: [email],
    //   },
    // });
    return resetPasswordOtp;
  }

  /**
   *
   * @param mobile : string
   *
   * @return string
   */
  async getMobileOtp(mobile: string): Promise<Boolean> {
    // const user = await this.userService.findOne({ where: { mobile } });
    // if (!user) {
    //   throw new ForbiddenException();
    // }
    try {
      this.sendProdoSms(mobile);
    } catch (error) {
      console.log("ERROR WHILE SENDING OTP:",error);
    }
    return true;
  }

    /**
   *
   * @param mobile : string
   *
   * @return string
   */
     async getTokenByMobile(mobile: string): Promise<TokenResponseDto> {
      const user = await this.userService.findOne({ where: { mobile } });
      if (!user) {
        throw new ForbiddenException();
      }
      try {
        const token = await this.generateToken(user,this.configService.get('JWT_EXP_TIME'));
        if (!token) {
          throw new InternalServerErrorException();
        }
        return { token, type: 'Bearer', isUserExist:true};
      } catch (error) {
        return { token:null, type: 'Bearer', isUserExist:true};
      }
    }

  /**
   *
   * @param mobile : string
   *
   * @return string
   */
   async validateMobileNumber(mobile: string): Promise<Object | string> {
    const user = await this.userService.findOne({ where: { mobile } });
  
    const loginOtp = '1234'//this.otpService.generateOtp();
    const message = `${loginOtp} is your otp to login into Cantech!`;
    const smsApi = { ...SMS_API_CONFIG };
    smsApi['mobiles'] = mobile;
    smsApi['message'] = message;
    // this.smsService.sendSms([
    //   {
    //     channel: 'api',
    //     message,
    //     mobile,
    //     api: smsApi,
    //     smsGateway:'msg91',
    //     type:'template',
    //     templateId:this.confiervice.get('OTP_TEMPLATE_ID')
    //   },
    // ]);
    if (!user) {
      return {'message': 'User not exist', isUserExist : false};
    }else{
      // await this.userService.updateById(user.id, {
      //   loginOtp,
      // });
    }
    return { message: `Otp sent successfully on ${mobile}!`,  isUserExist : true };
  }

  /**
   *
   * @param token : string
   * @param password : string
   *
   * @return boolean
   */
  async resetPassword(email: string, otp: string, password: string) {
    const user = await this.userService.findOne({
      where: { email: email, resetPasswordOtp: otp },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    const { resetPasswordOtpExpiresIn } = user;

    if (moment(resetPasswordOtpExpiresIn).isBefore(moment())) {
      throw new ForbiddenException();
    }

    const isValid = this.otpService.verifyOtp(otp);

    if (!isValid) {
      throw new ForbiddenException();
    }

    this.notificationService.sendNotification({
      category: 'Users',
      trigger: 'RESET_PASSWORD_SUCCESSFUL',
      data: {
        firstName: user.firstName,
      },
      email: {
        to: [email],
      },
    });

    await this.userService.updateById(user.id, {
      password
    });

    return true;
  }

  /**
   * Generate JWT Token with User Data
   *
   * @param user : UserDto
   *
   * @return string
   */
  async generateToken(user: User, expiresIn: number | string = '24h') {
    return this.jwtService.signAsync(_.pick(user, [ 'id','name', 'email','mobile']), {
      expiresIn,
    });
  }

  /**
   * Validate the JWT Token is Expired or Invalid Token
   *
   * @param token: string
   *
   * @return any
   */
  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  /**
   * Extract the Data from the Token
   *
   * @param token : string
   *
   * @return any
   */
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }


  private async sendProdoSms(mobileNo:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqOption: any = {
          url: `${this.configService.get('PRODO_URL')}/sms/sendOtp`,
          method: 'POST',
          data: {mobileNo }
        }
        console.log("PARAMS ::::",JSON.stringify(reqOption));
        const res : ProdoApiRes= await this.apiService.request(reqOption);
          resolve(res);
     
      } catch (error) {
        reject(error);
      }
    })
  }

  private async verifyOtp(mobileNo:string, otp:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqOption: any = {
          url: `${this.configService.get('PRODO_URL')}/sms/verifyOtp`,
          method: 'POST',
          data: {mobileNo ,otp }
        }
        console.log("PARAMS ::::",JSON.stringify(reqOption));
        const res : ProdoApiRes= await this.apiService.request(reqOption);
          resolve(res);
     
      } catch (error) {
        reject(error);
      }
    })
  }
}
