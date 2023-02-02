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
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanCurrentUser, CurrentUser } from '@can/common';
import { ManufacturerSyncInterceptor } from 'src/common/interceptors/manufacturer-sync.interceptor';

@Controller('addresses')
export class AddressController { 
    constructor(private addressService: AddressService) {}

    // @UseInterceptors(new ManufacturerSyncInterceptor())
    @Post()
    async create(@Body(ValidationPipe) addressDto: AddressDto) {
        return this.addressService.create(addressDto);
    }

    @Get()
    async findAll(
        @Query('filter', ParseFilterPipe) filter: FindOptions,
        @CurrentUser()  user: CanCurrentUser,
        ) {
        return this.addressService.findAll(filter,user);
    }   

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.addressService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) addressDto: AddressDto,
    ) {
        return this.addressService.updateById(id, addressDto);
    }


}