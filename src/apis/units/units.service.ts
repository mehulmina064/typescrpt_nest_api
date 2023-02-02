import { Injectable, Inject } from '@nestjs/common';
import { UNITS_REPOSITORY } from './units.repository';
import { Units } from './units.model';
import { UnitsDto } from './units.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class UnitsService {
  constructor(
    @Inject(UNITS_REPOSITORY) private readonly unitsRepository: typeof Units
  ) {}

  async create(units: UnitsDto): Promise<Units> {
    return this.unitsRepository.create<Units>(units);
  }

  async findAll(filter: FindOptions) {
    return this.unitsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Units> {
    return this.unitsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.unitsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.unitsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.unitsRepository.upsert(data);
  }
}
