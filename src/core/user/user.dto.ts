import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex',
}

enum Type {
  INTERNAL = 'internal',
  MANUFACTURER = 'manufacturer'
}

export class UserDto {

  @IsOptional()
  id: number;

  @IsOptional()
  @ApiProperty()
   firstName: string;

  @IsOptional()
  @ApiProperty()
   middleName: string;

  @IsOptional()
  @ApiProperty()
   lastName: string;

  @IsOptional()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  // @MinLength(10)
  // @MaxLength(10)
  @ApiProperty()
  readonly mobile: string;

  @IsOptional()
  readonly loginInfo: string[];

  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  readonly resetPasswordOtpExpiresIn: string;

  @IsOptional()
  readonly resetPasswordOtp: string;

  // @IsOptional()
  // readonly loginOtp: string;

  @IsOptional()
  // @IsEnum(Gender)
  @IsString()
  @ApiProperty()
  readonly gender: string;

  @IsOptional()
  @IsObject()
  @ApiProperty()
  readonly userDetails:any

  // @IsOptional()
  // @IsEnum(Status)
  // @ApiProperty()
  // readonly status: string;
  @IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
