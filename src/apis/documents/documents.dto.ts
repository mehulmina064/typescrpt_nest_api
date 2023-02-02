import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class DocumentsDto {

  @ApiProperty()
  readonly attention: string;

  @ApiProperty()
  readonly gstin: string;

  @IsOptional()
@IsString()
@ApiProperty()
readonly regionCode: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly gstTreatment: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly tax: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly state: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly panNumber: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly panCopy: string;
    

@IsOptional()
@IsString()
@ApiProperty()
readonly gstCertificate: string;

@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isPrimary: boolean;


@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly manufacturerId: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}