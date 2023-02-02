import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceRepository } from './balance.repository';
import { BalanceService } from './balance.service';

@Module({
    imports: [],
    controllers: [BalanceController],
    providers: [BalanceRepository, BalanceService],
    exports: [BalanceService]
})
export class BalanceModule { }
