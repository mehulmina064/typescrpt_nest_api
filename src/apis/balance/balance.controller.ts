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
import { BalanceDto } from './balance.dto';
import { BalanceService } from './balance.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('balances')
export class BalanceController { 
    constructor(private balanceService: BalanceService) {}

    @Post()
    async create(@Body(ValidationPipe) balanceDto: BalanceDto) {
        return this.balanceService.create(balanceDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.balanceService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.balanceService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.balanceService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) balanceDto: BalanceDto,
    ) {
        return this.balanceService.updateById(id, balanceDto);
    }
}