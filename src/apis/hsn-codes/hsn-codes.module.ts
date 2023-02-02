import { Module } from '@nestjs/common';
import { HsnCodesController } from './hsn-codes.controller';
import { HsnCodesRepository } from './hsn-codes.repository';
import { HsnCodesService } from './hsn-codes.service';

@Module({
    imports: [],
    controllers: [HsnCodesController],
    providers: [HsnCodesRepository, HsnCodesService],
    exports: [HsnCodesService]
})
export class HsnCodesModule { }
