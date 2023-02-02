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
  UseInterceptors,
} from '@nestjs/common';
import { FinanceDto } from './finance.dto';
import { FinanceService } from './finance.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { ManufacturerSyncInterceptor } from 'src/common/interceptors/manufacturer-sync.interceptor';

@Controller('finances')
export class FinanceController { 
    constructor(private financeService: FinanceService) {}

    // @UseInterceptors(new ManufacturerSyncInterceptor())
    @Post()
    async create(@Body(ValidationPipe) financeDto: FinanceDto) {
        return this.financeService.create(financeDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.financeService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.financeService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.financeService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) financeDto: FinanceDto,
    ) {
        return this.financeService.updateById(id, financeDto);
    }
}