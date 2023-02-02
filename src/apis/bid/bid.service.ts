import { Injectable, Inject } from '@nestjs/common';
import { BID_REPOSITORY } from './bid.repository';
import { Bid } from './bid.model';
import { BidDto } from './bid.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class BidService {
  constructor(
    @Inject(BID_REPOSITORY) private readonly bidRepository: typeof Bid
  ) {}

  async create(bid: BidDto): Promise<Bid> {
    return this.bidRepository.create<Bid>(bid);
  }

  async findAll(filter: FindOptions) {
    return this.bidRepository.findAll(filter);
  }

  async findById(id: number): Promise<Bid> {
    return this.bidRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.bidRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.bidRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.bidRepository.upsert(data);
  }
}
