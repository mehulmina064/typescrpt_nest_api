import { Injectable, Inject } from '@nestjs/common';
import { CERTIFICATES_REPOSITORY } from './certificates.repository';
import { Certificates } from './certificates.model';
import { CertificatesDto } from './certificates.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class CertificatesService {
  constructor(
    @Inject(CERTIFICATES_REPOSITORY) private readonly certificatesRepository: typeof Certificates
  ) {}

  async create(certificates: CertificatesDto): Promise<Certificates> {
    return this.certificatesRepository.create<Certificates>(certificates);
  }

  async findAll(filter: FindOptions) {
    return this.certificatesRepository.findAll(filter);
  }

  async findById(id: number): Promise<Certificates> {
    return this.certificatesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.certificatesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.certificatesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.certificatesRepository.upsert(data);
  }
}
