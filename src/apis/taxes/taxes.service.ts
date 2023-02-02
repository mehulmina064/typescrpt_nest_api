import { Injectable, Inject } from '@nestjs/common';
import { TAXES_REPOSITORY } from './taxes.repository';
import { Taxes } from './taxes.model';
import { TaxesDto } from './taxes.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class TaxesService {
  constructor(
    @Inject(TAXES_REPOSITORY) private readonly taxesRepository: typeof Taxes
  ) {}

  async create(taxes: TaxesDto): Promise<Taxes> {
    return this.taxesRepository.create<Taxes>(taxes);
  }

  async findAll(filter: FindOptions) {
    return this.taxesRepository.findAll(filter);
  }

  async findById(id: number): Promise<Taxes> {
    return this.taxesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.taxesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.taxesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.taxesRepository.upsert(data);
  }
}
