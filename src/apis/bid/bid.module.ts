import { Module } from '@nestjs/common';
import { BidController } from './bid.controller';
import { BidRepository } from './bid.repository';
import { BidService } from './bid.service';

@Module({
    imports: [],
    controllers: [BidController],
    providers: [BidRepository, BidService],
    exports: [BidService]
})
export class BidModule { }
