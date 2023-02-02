import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Items } from 'src/common/types/items.type';

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECT = 'reject'
}


export class BidDto {

      
@IsOptional()
@IsString()
@ApiProperty()
readonly bidId: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly rfqId: string;

    
@IsNotEmpty()
@IsNumber()
@ApiProperty()
readonly estimatedAmount: number;

    
@IsNotEmpty()
@IsNumber()
@ApiProperty()
readonly manufacturerId: number;


    
@IsOptional()
@IsEnum(Status)
@ApiProperty()
readonly status: string;
    
      
@IsNotEmpty()
@IsString()
@ApiProperty()
readonly paymentTerms: string;

      
@IsOptional()
@IsString()
@ApiProperty()
readonly notes: string;

      
@IsOptional()
@IsString()
@ApiProperty()
readonly countryCode: string;

      
@IsNotEmpty()
@IsArray()
@ApiProperty()
readonly items: Items[];


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