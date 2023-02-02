import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly roleId: number;
}
