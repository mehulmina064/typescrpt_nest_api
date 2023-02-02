import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsRepository } from './units.repository';
import { UnitsService } from './units.service';

@Module({
    imports: [],
    controllers: [UnitsController],
    providers: [UnitsRepository, UnitsService],
    exports: [UnitsService]
})
export class UnitsModule { }
