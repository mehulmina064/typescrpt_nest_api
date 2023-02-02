import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { QueryService } from 'src/common/services/query/query.service';
import { UserModule } from 'src/core/user/user.module';
import { AddressModule } from '../address/address.module';
import { OtherProductsModule } from '../other-products/other-products.module';
import { UserManufactureMapModule } from '../user-manufacture-map/user-manufacture-map.module';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerRepository } from './manufacturer.repository';
import { ManufacturerService } from './manufacturer.service';

@Module({
    imports: [
        OtherProductsModule, 
        CommonModule,
        UserModule,
        UserManufactureMapModule,
        AddressModule
    ],
    controllers: [ManufacturerController],
    providers: [ManufacturerRepository, ManufacturerService],
    exports: [ManufacturerService]
})
export class ManufacturerModule { }
