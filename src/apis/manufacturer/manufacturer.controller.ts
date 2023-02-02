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
import { ManufacturerDto, RegisterManufacturerDto, UnregisterManufacturerDto } from './manufacturer.dto';
import { ManufacturerService } from './manufacturer.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { ManufacturerSyncInterceptor } from 'src/common/interceptors/manufacturer-sync.interceptor';
import { MANUFACTURER_SOURCE } from 'src/common/enums/common.enum';

@Controller('manufacturers')
export class ManufacturerController { 
    constructor(private manufacturerService: ManufacturerService) {}

    
    @Post()
    async create(@Body(ValidationPipe) manufacturerDto: ManufacturerDto) {
        return this.manufacturerService._create(manufacturerDto,MANUFACTURER_SOURCE.APP);
    }
    @Post('/un-register/user-maps')
    async unregister(@Body(ValidationPipe) unregisterManufacturerDto: UnregisterManufacturerDto) {
        return this.manufacturerService.createUnregister(unregisterManufacturerDto,MANUFACTURER_SOURCE.APP);
    }

    @Post('/register/user-maps')
    async register(@Body(ValidationPipe) registerManufacturerDto: RegisterManufacturerDto) {
        return this.manufacturerService.createRegister(registerManufacturerDto,MANUFACTURER_SOURCE.APP);
    }

    @Post('refresh/sync-zoho')
    async syncZoho(@Body(ValidationPipe) manufacturerDto: ManufacturerDto) {
        return this.manufacturerService.getZohoContact();
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.manufacturerService.findAll(filter);
    }
    
    @Get('products')
    async findProducts(@Query('filter') filter: any) {
        return this.manufacturerService.findProducts(JSON.parse(filter));
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.manufacturerService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.manufacturerService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) manufacturerDto: ManufacturerDto,
    ) {
        return this.manufacturerService.updateById(id, manufacturerDto);
    }
}