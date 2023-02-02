import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CertificatesDto } from './certificates.dto';
import { CertificatesService } from './certificates.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('certificates')
export class CertificatesController { 
    constructor(private certificatesService: CertificatesService) {}

    @Post()
    async create(@Body(ValidationPipe) certificatesDto: CertificatesDto) {
        return this.certificatesService.create(certificatesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.certificatesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.certificatesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.certificatesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) certificatesDto: CertificatesDto,
    ) {
        return this.certificatesService.updateById(id, certificatesDto);
    }
}