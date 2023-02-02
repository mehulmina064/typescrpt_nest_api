import { Injectable, Inject } from '@nestjs/common';
import { PRODUCTMANUFATURERLOGISTICS_REPOSITORY } from './product-manufaturer-logistics.repository';
import { ProductManufaturerLogistics } from './product-manufaturer-logistics.model';
import { ProductManufaturerLogisticsDto } from './product-manufaturer-logistics.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ProductManufaturerLogisticsService {
  constructor(
    @Inject(PRODUCTMANUFATURERLOGISTICS_REPOSITORY) private readonly productManufaturerLogisticsRepository: typeof ProductManufaturerLogistics
  ) {}

  async create(productManufaturerLogistics: ProductManufaturerLogisticsDto): Promise<ProductManufaturerLogistics> {
    return this.productManufaturerLogisticsRepository.create<ProductManufaturerLogistics>(productManufaturerLogistics);
  }

  async findAll(filter: FindOptions) {
    return this.productManufaturerLogisticsRepository.findAll(filter);
  }

  async findById(id: number): Promise<ProductManufaturerLogistics> {
    return this.productManufaturerLogisticsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.productManufaturerLogisticsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.productManufaturerLogisticsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.productManufaturerLogisticsRepository.upsert(data);
  }
}
