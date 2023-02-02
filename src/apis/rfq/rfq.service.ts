import { Injectable, Inject } from '@nestjs/common';
import { RFQ_REPOSITORY } from './rfq.repository';
import { Rfq } from './rfq.model';
import { ProdoRfqDto, RfqDto } from './rfq.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { ProdoService } from 'src/common/services/prodo/prodo.service';
import { ExceptionService } from 'src/common/services/exceptions/exception.service';

@Injectable()
export class RfqService {
  constructor(
    @Inject(RFQ_REPOSITORY) private readonly rfqRepository: typeof Rfq,
    private prodoService :ProdoService,
    private exceptionService: ExceptionService
  ) {}

  async create(rfq: ProdoRfqDto): Promise<any> {
    try {
      const lineItems = [...rfq.lineItems];
      delete rfq.lineItems 
      const createdRfq:any = await  this.prodoService.postRfq(rfq);
      this.createLineItems(lineItems, createdRfq.data.id);
      return createdRfq && createdRfq.data ? createdRfq.data : [];
    } catch (error) {
      return this.exceptionService.handleError( error.response && error.response.data && error.response.data.message? error.response.data.message : error.message, error.response && error.response.status ? error.response.status : error.status)
    }
  }

  async findAll(filter: FindOptions) {
    try {
      const rfqs = await  this.prodoService.getRfq(filter);
      // return rfqs && rfqs.data ? rfqs.data : [];
      return this.formatRfq(rfqs && rfqs.data ? rfqs.data : []);
    } catch (error) {
      return this.exceptionService.handleError(error.message, error.response && error.response.status ? error.response.status : error.status)
    }

  }

  async findProductBySku(sku:string) {
    try {
      const rfqs = await  this.prodoService.getProductBySku(sku);
      return rfqs  ? rfqs : {};
    } catch (error) {
      return this.exceptionService.handleError(error.message, error.response && error.response.status ? error.response.status : error.status)
    }

  }

  async findProducts() {
    try {
      const rfqs = await  this.prodoService.getProducts();
      return rfqs && rfqs.data ? rfqs.data : [];
    } catch (error) {
      return this.exceptionService.handleError(error.message, error.response && error.response.status ? error.response.status : error.status)
    }

  }

  async findById(id: string): Promise<any> {
    try {
      const rfqs = await  this.prodoService.getRfqById(id);
      return rfqs && rfqs ? rfqs : {};
    } catch (error) {
      return this.exceptionService.handleError(error.message, error.response && error.response.status ? error.response.status : error.status)
    }
  }

  async count(filter: CountOptions) {
    const totalCount = await this.rfqRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.rfqRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.rfqRepository.upsert(data);
  }

  formatRfq(rfqs:any[]){
    return rfqs.sort( (first, second) => second.createdAt - first.createdAt);
  }

  async createLineItems(items:any[],rfqId:string){
    try {
      await  this.prodoService.postRfqLineItems(items,rfqId);
    } catch (error) {
      console.log("ERROR WHILE CREATING LINE ITEM");
    }
    // for (let index = 0; index < items.length; index++) {
      
    // }
  }
}
