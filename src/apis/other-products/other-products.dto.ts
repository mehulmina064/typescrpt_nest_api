import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class OtherProductsDto {


  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sku: string;


  @IsOptional()
  @IsString()
  @ApiProperty()
  skuName: string;

  
  @IsOptional()
  @IsString()
  @ApiProperty()
  unit: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  moq: string;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  price: string;
  
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  images: string[];
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  annualUnitSold: string;
 


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