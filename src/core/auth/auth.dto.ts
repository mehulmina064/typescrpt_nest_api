import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class LoginOtpDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  mobile: string;

  @IsNotEmpty()
  @ApiProperty()
  otp: string;
}

export class LoginResponseDto {
  token: string;
  type: 'Bearer';
}

export class RecoverDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class GenerateMobileOtpDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  mobile: string;
}

export class RecoverResponseDto {
  message: string;
}

export class TokenResponseDto {
  token : string;
  type: string;
  isUserExist: boolean;
 }

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  otp: string;

  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  password: string;
}

export class ResetPasswordResponseDto {
  message: string;
}
