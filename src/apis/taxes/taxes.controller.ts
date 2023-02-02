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
import { TaxesDto } from './taxes.dto';
import { TaxesService } from './taxes.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('taxes')
export class TaxesController { 
    constructor(private taxesService: TaxesService) {}

    @Post()
    async create(@Body(ValidationPipe) taxesDto: TaxesDto) {
        return this.taxesService.create(taxesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.taxesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.taxesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.taxesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) taxesDto: TaxesDto,
    ) {
        return this.taxesService.updateById(id, taxesDto);
    }
}