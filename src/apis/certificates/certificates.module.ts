import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesRepository } from './certificates.repository';
import { CertificatesService } from './certificates.service';

@Module({
    imports: [],
    controllers: [CertificatesController],
    providers: [CertificatesRepository, CertificatesService],
    exports: [CertificatesService]
})
export class CertificatesModule { }
