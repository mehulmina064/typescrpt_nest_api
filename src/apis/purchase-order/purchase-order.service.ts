import { Injectable, Inject } from '@nestjs/common';
import { PURCHASEORDER_REPOSITORY } from './purchase-order.repository';
import { PurchaseOrder } from './purchase-order.model';
import { PurchaseOrderDto } from './purchase-order.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @Inject(PURCHASEORDER_REPOSITORY) private readonly purchaseOrderRepository: typeof PurchaseOrder
  ) {}

  async create(purchaseOrder: PurchaseOrderDto): Promise<PurchaseOrder> {
    return this.purchaseOrderRepository.create<PurchaseOrder>(purchaseOrder);
  }

  async findAll(filter: FindOptions) {
    return this.purchaseOrderRepository.findAll(filter);
  }

  async findById(id: number): Promise<PurchaseOrder> {
    return this.purchaseOrderRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.purchaseOrderRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.purchaseOrderRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.purchaseOrderRepository.upsert(data);
  }
}
