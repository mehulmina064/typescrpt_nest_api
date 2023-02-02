import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UnitsDto {


@IsOptional()
@IsString()
@ApiProperty()
readonly unit: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly unitType: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly description: string;

    
@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}