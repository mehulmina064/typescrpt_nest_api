import { Injectable, Inject } from '@nestjs/common';
import { PRODUCTS_REPOSITORY } from './products.repository';
import { Products } from './products.model';
import { ProductsDto } from './products.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY) private readonly productsRepository: typeof Products
  ) {}

  async create(products: ProductsDto): Promise<Products> {
    return this.productsRepository.create<Products>(products);
  }

  async findAll(filter: FindOptions) {
    return this.productsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Products> {
    return this.productsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.productsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.productsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.productsRepository.upsert(data);
  }
}
