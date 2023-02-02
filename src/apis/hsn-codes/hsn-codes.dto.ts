import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class HsnCodesDto {


@IsNotEmpty()
@IsString()
@ApiProperty()
readonly hsnCode: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly description: string;
      
@IsOptional()
@IsNumber()
@ApiProperty()
readonly cgst: number;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly sgst: number;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly igst: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly compensationCess: number;


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