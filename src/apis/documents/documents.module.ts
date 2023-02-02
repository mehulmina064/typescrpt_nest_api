import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repository';
import { DocumentsService } from './documents.service';

@Module({
    imports: [],
    controllers: [DocumentsController],
    providers: [DocumentsRepository, DocumentsService],
    exports: [DocumentsService]
})
export class DocumentsModule { }
