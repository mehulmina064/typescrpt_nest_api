import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsArray()
  paths: string[];
}
