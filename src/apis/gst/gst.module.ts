import { Module } from '@nestjs/common';
import { GstController } from './gst.controller';
import { GstRepository } from './gst.repository';
import { GstService } from './gst.service';

@Module({
    imports: [],
    controllers: [GstController],
    providers: [GstRepository, GstService],
    exports: [GstService]
})
export class GstModule { }
