import { Injectable, Inject } from '@nestjs/common';
import { FINANCE_REPOSITORY } from './finance.repository';
import { Finance } from './finance.model';
import { FinanceDto } from './finance.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class FinanceService {
  constructor(
    @Inject(FINANCE_REPOSITORY) private readonly financeRepository: typeof Finance
  ) {}

  async create(finance: FinanceDto): Promise<Finance> {
    return this.financeRepository.create<Finance>(finance);
  }

  async findAll(filter: FindOptions) {
    return this.financeRepository.findAll(filter);
  }

  async findById(id: number): Promise<Finance> {
    return this.financeRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.financeRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.financeRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.financeRepository.upsert(data);
  }
}
