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
import { UserManufactureMapDto } from './user-manufacture-map.dto';
import { UserManufactureMapService } from './user-manufacture-map.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('user-manufacture-maps')
export class UserManufactureMapController { 
    constructor(private userManufactureMapService: UserManufactureMapService) {}

    @Post()
    async create(@Body(ValidationPipe) userManufactureMapDto: UserManufactureMapDto) {
        return this.userManufactureMapService.create(userManufactureMapDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.userManufactureMapService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.userManufactureMapService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.userManufactureMapService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) userManufactureMapDto: UserManufactureMapDto,
    ) {
        return this.userManufactureMapService.updateById(id, userManufactureMapDto);
    }
}