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
import { Status } from 'src/common/enums/status.enum';

export class ProductManufacturerMapDto {


//   @IsOptional()
// @IsEnum(Status)
// @ApiProperty()
// readonly status: Status;

@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

  @IsNotEmpty()
@IsNumber()
@ApiProperty()
readonly productId: number;

@IsNotEmpty()
@IsNumber()
@ApiProperty()
readonly manufacturerId: number;



    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    leadTime: number;
    
    
    
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    readyStock: boolean;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    moq: string;


    @IsOptional()
    @IsNumber()
    @ApiProperty()
    length: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    width: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    height: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    weight: string;
    
    
    
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    fragile: boolean;
    
    
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    biodegradable: boolean;
    
    
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    vendorSkuId: string;
    

    
    @IsOptional()
    @IsArray()
    @ApiProperty()
    vendorSkuImages: string[];


    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}