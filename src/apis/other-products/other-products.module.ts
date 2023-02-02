import { Module } from '@nestjs/common';
import { OtherProductsController } from './other-products.controller';
import { OtherProductsRepository } from './other-products.repository';
import { OtherProductsService } from './other-products.service';

@Module({
    imports: [],
    controllers: [OtherProductsController],
    providers: [OtherProductsRepository, OtherProductsService],
    exports: [OtherProductsService]
})
export class OtherProductsModule { }
