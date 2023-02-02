import { Injectable, Inject } from '@nestjs/common';
import { DOCUMENTS_REPOSITORY } from './documents.repository';
import { Documents } from './documents.model';
import { DocumentsDto } from './documents.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY) private readonly documentsRepository: typeof Documents
  ) {}

  async create(documents: DocumentsDto): Promise<Documents> {
    return this.documentsRepository.create<Documents>(documents);
  }

  async findAll(filter: FindOptions) {
    return this.documentsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Documents> {
    return this.documentsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.documentsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.documentsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.documentsRepository.upsert(data);
  }
}
