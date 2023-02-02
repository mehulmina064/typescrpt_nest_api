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
import { OtherProductsDto } from './other-products.dto';
import { OtherProductsService } from './other-products.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('other-products')
export class OtherProductsController { 
    constructor(private otherProductsService: OtherProductsService) {}

    @Post()
    async create(@Body(ValidationPipe) otherProductsDto: OtherProductsDto) {
        return this.otherProductsService.create(otherProductsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.otherProductsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.otherProductsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.otherProductsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) otherProductsDto: OtherProductsDto,
    ) {
        return this.otherProductsService.updateById(id, otherProductsDto);
    }
}