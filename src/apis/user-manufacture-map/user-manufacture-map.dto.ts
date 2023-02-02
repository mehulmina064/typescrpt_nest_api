import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export enum USER_MANUFACTURE_MAP_TYPE {
  primary = 'primary',
  secondary = 'secondary'
  }
export class UserManufactureMapDto {

//   @IsOptional()
// @IsEnum(Status)
// @ApiProperty()
// readonly status: Status;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly workPhone: number;

@IsOptional()
@IsString()
@ApiProperty()
readonly workEmail: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly designation: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly department: string;

@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

  @ApiProperty()
  @IsEnum(USER_MANUFACTURE_MAP_TYPE)
  readonly type: string;
  
@IsNotEmpty()
@IsNumber()
@ApiProperty()
readonly userId: number;

@IsNotEmpty()
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