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
import { UnitsDto } from './units.dto';
import { UnitsService } from './units.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('units')
export class UnitsController { 
    constructor(private unitsService: UnitsService) {}

    @Post()
    async create(@Body(ValidationPipe) unitsDto: UnitsDto) {
        return this.unitsService.create(unitsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.unitsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.unitsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.unitsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) unitsDto: UnitsDto,
    ) {
        return this.unitsService.updateById(id, unitsDto);
    }
}