import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common';
import { FileUploadDto } from './file-upload.dto';
import { FileUploadService } from './file-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async create(@UploadedFiles() files) {
    console.log("files :::::::",files);
    
    return this.fileUploadService.uploadFileToS3(files);
  }

  @Post('delete')
  @HttpCode(200)
  async delete(@Body(ValidationPipe) fileUploadDto: FileUploadDto) {
    return this.fileUploadService.deleteFromS3(fileUploadDto);
  }
}
