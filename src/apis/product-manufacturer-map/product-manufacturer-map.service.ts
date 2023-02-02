import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PRODUCTMANUFACTURERMAP_REPOSITORY } from './product-manufacturer-map.repository';
import { ProductManufacturerMap } from './product-manufacturer-map.model';
import { ProductManufacturerMapDto } from './product-manufacturer-map.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ProductManufacturerMapService {
  constructor(
    @Inject(PRODUCTMANUFACTURERMAP_REPOSITORY) private readonly productManufacturerMapRepository: typeof ProductManufacturerMap
  ) {}

  async create(productManufacturerMap: ProductManufacturerMapDto): Promise<ProductManufacturerMap> {
    if(productManufacturerMap.productId && productManufacturerMap.manufacturerId){
      const productManufacturerMapData = await this.findOne({ where : { 
        productId : productManufacturerMap.productId,
        manufacturerId : productManufacturerMap.manufacturerId
      }})
      if(productManufacturerMapData){
        throw new BadRequestException("Product is already mapped with this manufactuere");
      }
    }
    return this.productManufacturerMapRepository.create<ProductManufacturerMap>(productManufacturerMap);
  }

  async findAll(filter: FindOptions) {
    return this.productManufacturerMapRepository.findAll(filter);
  }

  async findOne(filter: FindOptions) {
    return this.productManufacturerMapRepository.findOne(filter);
  }

  async findById(id: number): Promise<ProductManufacturerMap> {
    return this.productManufacturerMapRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.productManufacturerMapRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.productManufacturerMapRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.productManufacturerMapRepository.upsert(data);
  }
}
