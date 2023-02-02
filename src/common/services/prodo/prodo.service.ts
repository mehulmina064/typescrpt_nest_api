import {
    HttpService,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
import { ProdoRfqDto } from 'src/apis/rfq/rfq.dto';
import { Items } from 'src/common/types/items.type';
  import { ApiService } from '../api/api.service';
  
  @Injectable()
  export class ProdoService {
    constructor(
      private configService: ConfigService,
      private apiService: ApiService,
    ) {}
  
    public async getAuthHeaders() {
      try {
        const res:any = await this.apiService.post(
            `${this.configService.get('PRODO_URL')}/internal/employee/login`,
            {
                "email": this.configService.get('PRODO_EMAIL'),
                "password": this.configService.get('PRODO_PASSWORD')
             }
        );
        return {
          Authorization: `Bearer ${res.access_token}`
        };
      } catch (error) {
        throw new InternalServerErrorException(error ? error.message : error);
      }
    }
  
    public async getRfq(params: object) {
      try {
        const headers = await this.getAuthHeaders();
        return this.apiService.get(
          `${this.configService.get(
            'PRODO_URL',
          )}/internal/rfq`,
          params,
          headers,
        );
      } catch (error) {
        throw new InternalServerErrorException(
          error ? error.message : error
        );
      }
    }

    public async getRfqById(id: string) {
        try {
          const headers = await this.getAuthHeaders();
          return this.apiService.get(
            `${this.configService.get(
              'PRODO_URL',
            )}/internal/rfq/${id}`,
            {},
            headers,
          );
        } catch (error) {
          throw new InternalServerErrorException(
            error ? error.message : error
          );
        }
      }
  
    public async getProductBySku(sku:string) {
        try {
          const headers = await this.getAuthHeaders();
          return this.apiService.get(
            `${this.configService.get(
              'PRODO_URL',
            )}/internal/zohoData/products/BySku//${sku}`,
            {},
            headers,
          );
        } catch (error) {
          throw new InternalServerErrorException(
            error ? error.message : error
          );
        }
      }
  
      public async postRfq(body:ProdoRfqDto) {
        try {
          const headers = await this.getAuthHeaders();
          return this.apiService.post(
            `${this.configService.get('PRODO_URL')}/internal/rfq`,
            body,
            headers
        );
        } catch (error) {
          throw new InternalServerErrorException(
            error ? error.message : error
          );
        }
      }

      public async postRfqLineItems(item:Items[],rfqId:string) {
        try {
          const headers = await this.getAuthHeaders();
          return this.apiService.post(
            `${this.configService.get('PRODO_URL')}/internal/rfq/addItems/${rfqId}`,
            item,
            headers
        );
        } catch (error) {
          throw new InternalServerErrorException(
            error ? error.message : error
          );
        }
      }

      public async getProducts() {
        try {
          const headers = await this.getAuthHeaders();
          return this.apiService.get(
            `${this.configService.get(
              'PRODO_URL',
            )}/internal/productPSku`,
            {},
            headers,
          );
        } catch (error) {
          throw new InternalServerErrorException(
            error ? error.message : error
          );
        }
      }
      
  }
  