import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { RfqController } from './rfq.controller';
import { RfqRepository } from './rfq.repository';
import { RfqService } from './rfq.service';

@Module({
    imports: [CommonModule],
    controllers: [RfqController],
    providers: [RfqRepository, RfqService],
    exports: [RfqService]
})
export class RfqModule { }
