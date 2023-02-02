import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class PermissionDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

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
