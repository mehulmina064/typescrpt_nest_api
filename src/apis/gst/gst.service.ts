import { Injectable, Inject } from '@nestjs/common';
import { GST_REPOSITORY } from './gst.repository';
import { Gst } from './gst.model';
import { GstDto } from './gst.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class GstService {
  constructor(
    @Inject(GST_REPOSITORY) private readonly gstRepository: typeof Gst
  ) {}

  async create(gst: GstDto): Promise<Gst> {
    return this.gstRepository.create<Gst>(gst);
  }

  async findAll(filter: FindOptions) {
    return this.gstRepository.findAll(filter);
  }

  async findById(id: number): Promise<Gst> {
    return this.gstRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.gstRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.gstRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.gstRepository.upsert(data);
  }
}
