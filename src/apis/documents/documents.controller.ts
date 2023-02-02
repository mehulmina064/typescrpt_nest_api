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
import { DocumentsDto } from './documents.dto';
import { DocumentsService } from './documents.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('documents')
export class DocumentsController { 
    constructor(private documentsService: DocumentsService) {}

    @Post()
    async create(@Body(ValidationPipe) documentsDto: DocumentsDto) {
        return this.documentsService.create(documentsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.documentsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.documentsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.documentsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) documentsDto: DocumentsDto,
    ) {
        return this.documentsService.updateById(id, documentsDto);
    }
}