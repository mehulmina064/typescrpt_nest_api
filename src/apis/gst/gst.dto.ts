import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class GstDto {


  @IsOptional()
  @IsString()
  @ApiProperty()
  gstName: string;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  cgst: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  sgst: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  igst: number;


  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;
  
  // @IsOptional()
  // @IsEnum(Status)
  // @ApiProperty()
  // status: string;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}