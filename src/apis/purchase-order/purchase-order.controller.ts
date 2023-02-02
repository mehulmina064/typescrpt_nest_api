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
import { PurchaseOrderDto } from './purchase-order.dto';
import { PurchaseOrderService } from './purchase-order.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('purchase-orders')
export class PurchaseOrderController { 
    constructor(private purchaseOrderService: PurchaseOrderService) {}

    @Post()
    async create(@Body(ValidationPipe) purchaseOrderDto: PurchaseOrderDto) {
        return this.purchaseOrderService.create(purchaseOrderDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.purchaseOrderService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.purchaseOrderService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.purchaseOrderService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) purchaseOrderDto: PurchaseOrderDto,
    ) {
        return this.purchaseOrderService.updateById(id, purchaseOrderDto);
    }
}