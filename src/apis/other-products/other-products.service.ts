import { Injectable, Inject } from '@nestjs/common';
import { OTHERPRODUCTS_REPOSITORY } from './other-products.repository';
import { OtherProducts } from './other-products.model';
import { OtherProductsDto } from './other-products.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class OtherProductsService {
  constructor(
    @Inject(OTHERPRODUCTS_REPOSITORY) private readonly otherProductsRepository: typeof OtherProducts
  ) {}

  async create(otherProducts: OtherProductsDto): Promise<OtherProducts> {
    return this.otherProductsRepository.create<OtherProducts>(otherProducts);
  }

  async findAll(filter: FindOptions) {
    return this.otherProductsRepository.findAll(filter);
  }

  async findById(id: number): Promise<OtherProducts> {
    return this.otherProductsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.otherProductsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.otherProductsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.otherProductsRepository.upsert(data);
  }
}
