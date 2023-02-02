import { Injectable, Inject } from '@nestjs/common';
import { HSNCODES_REPOSITORY } from './hsn-codes.repository';
import { HsnCodes } from './hsn-codes.model';
import { HsnCodesDto } from './hsn-codes.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class HsnCodesService {
  constructor(
    @Inject(HSNCODES_REPOSITORY) private readonly hsnCodesRepository: typeof HsnCodes
  ) {}

  async create(hsnCodes: HsnCodesDto): Promise<HsnCodes> {
    return this.hsnCodesRepository.create<HsnCodes>(hsnCodes);
  }

  async findAll(filter: FindOptions) {
    return this.hsnCodesRepository.findAll(filter);
  }

  async findById(id: number): Promise<HsnCodes> {
    return this.hsnCodesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.hsnCodesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.hsnCodesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.hsnCodesRepository.upsert(data);
  }
}
