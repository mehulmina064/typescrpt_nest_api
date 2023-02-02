import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';

@Module({
    imports: [CommonModule],
    controllers: [AddressController],
    providers: [AddressRepository, AddressService],
    exports: [AddressService]
})
export class AddressModule { }
