import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ADDRESS_TYPE } from 'src/common/enums/address.enum';
import { APPROVAL_STATUS } from 'src/common/enums/status.enum';




export class AddressDto {
  
  @ApiProperty()
  readonly attention: string;

  @ApiProperty()
  readonly country: string;

  @ApiProperty()
  readonly stateCode: string;
  

  @ApiProperty()
  readonly address1: string;

  @ApiProperty()
  readonly address2: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly state: string;

  @ApiProperty()
  readonly pinCode: number;


  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly googleMapsLink: string;

  @ApiProperty()
  readonly phone: number;

  @ApiProperty()
  readonly latitude: number;

  @ApiProperty()
  readonly longitude: number;


  @ApiProperty()
  @IsString()
  readonly gstin: string;


  @ApiProperty()
  @IsString()
  readonly gstinCertificate: string;


  @ApiProperty()
  @IsBoolean()
  readonly gstinSameAsPrimary: boolean;


@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;


@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isPrimary: boolean;


  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ADDRESS_TYPE)
  readonly type: ADDRESS_TYPE;

  @ApiProperty()
  @IsOptional()
  @IsEnum(APPROVAL_STATUS)
  readonly status: APPROVAL_STATUS;

@IsOptional()
@IsString()
@ApiProperty()
readonly zohoAddressId: string;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly documentId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
