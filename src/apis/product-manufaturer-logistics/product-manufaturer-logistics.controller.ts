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
import { ProductManufaturerLogisticsDto } from './product-manufaturer-logistics.dto';
import { ProductManufaturerLogisticsService } from './product-manufaturer-logistics.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('product-manufaturer-logistics')
export class ProductManufaturerLogisticsController { 
    constructor(private productManufaturerLogisticsService: ProductManufaturerLogisticsService) {}

    @Post()
    async create(@Body(ValidationPipe) productManufaturerLogisticsDto: ProductManufaturerLogisticsDto) {
        return this.productManufaturerLogisticsService.create(productManufaturerLogisticsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.productManufaturerLogisticsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.productManufaturerLogisticsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.productManufaturerLogisticsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) productManufaturerLogisticsDto: ProductManufaturerLogisticsDto,
    ) {
        return this.productManufaturerLogisticsService.updateById(id, productManufaturerLogisticsDto);
    }
}