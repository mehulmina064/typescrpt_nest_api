import { Injectable, Inject } from '@nestjs/common';
import { BALANCE_REPOSITORY } from './balance.repository';
import { Balance } from './balance.model';
import { BalanceDto } from './balance.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class BalanceService {
  constructor(
    @Inject(BALANCE_REPOSITORY) private readonly balanceRepository: typeof Balance
  ) {}

  async create(balance: BalanceDto): Promise<Balance> {
    return this.balanceRepository.create<Balance>(balance);
  }

  async findAll(filter: FindOptions) {
    return this.balanceRepository.findAll(filter);
  }

  async findById(id: number): Promise<Balance> {
    return this.balanceRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.balanceRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.balanceRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.balanceRepository.upsert(data);
  }
}
