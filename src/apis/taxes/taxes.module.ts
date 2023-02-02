import { Module } from '@nestjs/common';
import { TaxesController } from './taxes.controller';
import { TaxesRepository } from './taxes.repository';
import { TaxesService } from './taxes.service';

@Module({
    imports: [],
    controllers: [TaxesController],
    providers: [TaxesRepository, TaxesService],
    exports: [TaxesService]
})
export class TaxesModule { }
