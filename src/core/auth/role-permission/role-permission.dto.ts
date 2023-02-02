import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolePermissionsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly roleId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly permissionId: number;
}
