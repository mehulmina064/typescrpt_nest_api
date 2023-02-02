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
import { ProductManufacturerMapDto } from './product-manufacturer-map.dto';
import { ProductManufacturerMapService } from './product-manufacturer-map.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('product-manufacturer-maps')
export class ProductManufacturerMapController { 
    constructor(private productManufacturerMapService: ProductManufacturerMapService) {}

    @Post()
    async create(@Body(ValidationPipe) productManufacturerMapDto: ProductManufacturerMapDto) {
        return this.productManufacturerMapService.create(productManufacturerMapDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.productManufacturerMapService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.productManufacturerMapService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.productManufacturerMapService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) productManufacturerMapDto: ProductManufacturerMapDto,
    ) {
        return this.productManufacturerMapService.updateById(id, productManufacturerMapDto);
    }
}