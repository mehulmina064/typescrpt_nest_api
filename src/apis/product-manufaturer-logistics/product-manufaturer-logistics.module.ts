import { Module } from '@nestjs/common';
import { ProductManufaturerLogisticsController } from './product-manufaturer-logistics.controller';
import { ProductManufaturerLogisticsRepository } from './product-manufaturer-logistics.repository';
import { ProductManufaturerLogisticsService } from './product-manufaturer-logistics.service';

@Module({
    imports: [],
    controllers: [ProductManufaturerLogisticsController],
    providers: [ProductManufaturerLogisticsRepository, ProductManufaturerLogisticsService],
    exports: [ProductManufaturerLogisticsService]
})
export class ProductManufaturerLogisticsModule { }
