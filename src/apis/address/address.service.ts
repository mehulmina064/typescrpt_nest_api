import { Injectable, Inject } from '@nestjs/common';
import { ADDRESS_REPOSITORY } from './address.repository';
import { Address } from './address.model';
import { AddressDto } from './address.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { CanCurrentUser } from '@can/common';
import { ZohoService } from 'src/common/zoho/zoho.service';
import { QueryService } from 'src/common/services/query/query.service';
import { Query } from 'src/common/services/query/query';
import { ZOHO_API } from 'src/common/zoho/zoho.config';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: typeof Address,
    private queryService: QueryService,
    private zohoService: ZohoService
  ) {}

  async create(address: AddressDto): Promise<Address> {
    const createdData = await this.addressRepository.create<Address>(address);
    if(createdData && !createdData.zohoAddressId){
      // this.syncToZoho(createdData.id);
    }
    return createdData;
  }

  async findAll(filter: FindOptions,user?: CanCurrentUser) {
    return this.addressRepository.findAll(filter);
  }

  async findById(id: number): Promise<Address> {
    return this.addressRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.addressRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.addressRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.addressRepository.upsert(data);
  }

  async syncToZoho(addressId:number){
    const address = await this.queryService.executeQuery<any[]>(
      Query.getAddresssZohoZyncInfo(addressId),
    );
    try {
      console.log("ADDRESS :",address);
      
    const zohoRes = await this.zohoService.request(ZOHO_API.ADDRESS_SYNC, {...address[0]},{contactId: address[0]['contactId']});
      await this.updateById(addressId,{zohoAddressId :zohoRes && zohoRes.address_info ? zohoRes.address_info.address_id : null})
    } catch (error) {
      console.log("ERROR IS ZOHO SYNC :::", JSON.stringify(error));
      
    }
    // const authToken = await this.zohoService.generateAuthToken();
    // this.zohoService.syncManufacturer({...manufacturer[0], contact_type : 'vendor'},authToken)
  }
}
