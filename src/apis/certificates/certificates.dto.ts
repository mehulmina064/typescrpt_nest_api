import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CertificatesDto {

  @IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

@IsOptional()
@ApiProperty()
readonly auditReport: any;

@IsOptional()
@IsBoolean()
@ApiProperty()
readonly readyForFullScaleAudit: boolean;

@IsOptional()
@ApiProperty()
readonly certificationAttachments: any;

@IsOptional()
@ApiProperty()
readonly prodoCertifications: any;

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly cancelledChequeOrBankAccProof: string;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly manufacturerId: number;


@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}