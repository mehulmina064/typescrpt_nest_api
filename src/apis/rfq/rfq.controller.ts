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
import { ProdoRfqDto, RfqDto } from './rfq.dto';
import { RfqService } from './rfq.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('rfqs')
export class RfqController { 
    constructor(private rfqService: RfqService) {}

    // @Post()
    // async create(@Body(ValidationPipe) rfqDto: RfqDto) {
    //     return this.rfqService.create(rfqDto);
    // }

    @Post()
    async create(@Body(ValidationPipe) rfqDto: ProdoRfqDto) {
        return this.rfqService.create(rfqDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.rfqService.findAll(filter);
    }

    @Get('product/:sku')
    async findProductBySku(
        @Param('sku') sku: string,
        ) {
        return this.rfqService.findProductBySku(sku);
    }

    @Get('products')
    async findProduct(
        ) {
        return this.rfqService.findProducts();
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.rfqService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.rfqService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) rfqDto: RfqDto,
    ) {
        return this.rfqService.updateById(id, rfqDto);
    }
}