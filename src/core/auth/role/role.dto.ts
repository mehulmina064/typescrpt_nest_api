import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class RoleDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
