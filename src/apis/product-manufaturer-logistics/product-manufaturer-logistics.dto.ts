import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductManufaturerLogisticsDto {


  @IsOptional()
  @IsNumber()
  @ApiProperty()
  packOf: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  lengthInches: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  widthInches: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  height: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  storageType: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly productId: number;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly manufacturerId: number;
  
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