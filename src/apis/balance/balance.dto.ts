import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BalanceDto {

  @IsOptional()
@IsNumber()
@ApiProperty()
readonly openingBalance: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly closingBalance: number;

@IsOptional()
@IsString()
@ApiProperty()
readonly paymentTerms: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly tds: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly priceList: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly currency: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly sourceOfSupply: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly panUin: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly gstTreatment: string;

    

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
readonly manufacturerId: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}