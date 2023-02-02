import { Module } from '@nestjs/common';
import { UserManufactureMapController } from './user-manufacture-map.controller';
import { UserManufactureMapRepository } from './user-manufacture-map.repository';
import { UserManufactureMapService } from './user-manufacture-map.service';

@Module({
    imports: [],
    controllers: [UserManufactureMapController],
    providers: [UserManufactureMapRepository, UserManufactureMapService],
    exports: [UserManufactureMapService]
})
export class UserManufactureMapModule { }
