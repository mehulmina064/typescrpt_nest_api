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
import { HsnCodesDto } from './hsn-codes.dto';
import { HsnCodesService } from './hsn-codes.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('hsn-codes')
export class HsnCodesController { 
    constructor(private hsnCodesService: HsnCodesService) {}

    @Post()
    async create(@Body(ValidationPipe) hsnCodesDto: HsnCodesDto) {
        return this.hsnCodesService.create(hsnCodesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.hsnCodesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.hsnCodesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.hsnCodesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) hsnCodesDto: HsnCodesDto,
    ) {
        return this.hsnCodesService.updateById(id, hsnCodesDto);
    }
}