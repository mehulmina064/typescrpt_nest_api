import { Module } from '@nestjs/common';
import { ProductManufacturerMapController } from './product-manufacturer-map.controller';
import { ProductManufacturerMapRepository } from './product-manufacturer-map.repository';
import { ProductManufacturerMapService } from './product-manufacturer-map.service';

@Module({
    imports: [],
    controllers: [ProductManufacturerMapController],
    providers: [ProductManufacturerMapRepository, ProductManufacturerMapService],
    exports: [ProductManufacturerMapService]
})
export class ProductManufacturerMapModule { }
