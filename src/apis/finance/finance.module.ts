import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceRepository } from './finance.repository';
import { FinanceService } from './finance.service';

@Module({
    imports: [],
    controllers: [FinanceController],
    providers: [FinanceRepository, FinanceService],
    exports: [FinanceService]
})
export class FinanceModule { }
