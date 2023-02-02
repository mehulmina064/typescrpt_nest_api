import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaxesDto {


@IsOptional()
@IsString()
@ApiProperty()
readonly taxId: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly taxName: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly taxPercentage: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly taxType: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly taxSpecificType: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly isDefaultTax: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly isEditable: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly taxSpecification: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly diffRateReason: string;


@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;


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