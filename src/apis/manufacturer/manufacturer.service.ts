import { Injectable, Inject } from '@nestjs/common';
import { MANUFACTURER_REPOSITORY } from './manufacturer.repository';
import { Manufacturer } from './manufacturer.model';
import { ManufacturerDto, RegisterManufacturerDto, UnregisterManufacturerDto } from './manufacturer.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { ProductsService } from '../products/products.service';
import { OtherProductsService } from '../other-products/other-products.service';
import { parseQueryToSequalizeQuery } from 'src/common/utils/parser';
import { AnyARecord } from 'dns';
import { QueryService } from 'src/common/services/query/query.service';
import { Query } from 'src/common/services/query/query';
import { ZohoService } from 'src/common/zoho/zoho.service';
import { ANNUAL_TURNOVER, BUSINESS_TYPE, MANUFACTURER_SOURCE, PRIMARY_CATEGORIES_TYPE } from 'src/common/enums/common.enum';
import { ZOHO_API } from 'src/common/zoho/zoho.config';
import { UserService } from 'src/core/user/user.service';
import { UserManufactureMapService } from '../user-manufacture-map/user-manufacture-map.service';
import { AddressService } from '../address/address.service';

@Injectable()
export class ManufacturerService {
  constructor(
    @Inject(MANUFACTURER_REPOSITORY) private readonly manufacturerRepository: typeof Manufacturer,
    private otherProductsService: OtherProductsService,
    private queryService: QueryService,
    private zohoService: ZohoService,
    private userService: UserService,
    private userManufactuereMapService: UserManufactureMapService,
    private addressAddress: AddressService
  ) { }

  async create(manufacturer: ManufacturerDto): Promise<Manufacturer> {
    return this.manufacturerRepository.create<Manufacturer>(manufacturer);;
  }

  async _create(manufacturer: ManufacturerDto,source?:MANUFACTURER_SOURCE): Promise<Manufacturer> {
    const createdData = await this.create(manufacturer);
    // if(createdData && !createdData.zohoId){
    //   this.syncToZoho(createdData.id);
    // }
    await this.createPartnerId(createdData,source);
    if((manufacturer &&
      !manufacturer.zohoId)){
        // this.syncToZoho(createdData.id);
      }
    return createdData;
  }

  async put(manufacturer: ManufacturerDto): Promise<Manufacturer> {
    if(manufacturer.zohoId){
      const oldManufacturer = await this.findOne({ where : { zohoId : manufacturer.zohoId}});
      if(oldManufacturer){
        await this.updateById(oldManufacturer.id, manufacturer);
        return { ...JSON.parse(JSON.stringify(oldManufacturer)), ...manufacturer};
      }else{
        return this.create(manufacturer);
      }
    }
    return this.manufacturerRepository.create<Manufacturer>(manufacturer);;
  }

  async findAll(filter: FindOptions) {
    return this.manufacturerRepository.findAll(filter);
  }

  async findOne(filter: FindOptions) {
    return this.manufacturerRepository.findOne(filter);
  }

  async findProducts(filter: any) {
    const _filter = parseQueryToSequalizeQuery(JSON.parse(JSON.stringify(filter)));
    const customFilter = this.getFilterQuery(filter);
    const products = await this.queryService.executeQuery<any[]>(
      Query.getManufacturerProduct(customFilter.manufacturerId, customFilter.ilike),
    );
    const otherProducts = await this.otherProductsService.findAll(_filter);
    return [...JSON.parse(JSON.stringify(otherProducts)), ...products];
  }

  async findById(id: number): Promise<Manufacturer> {
    return this.manufacturerRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.manufacturerRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.manufacturerRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.manufacturerRepository.upsert(data);
  }

  async getZohoContact(){
    const res= await this.zohoService.request(ZOHO_API.CONTACT_GET);
    for (let index = 0; index < res.contacts.length; index++) {
      const contact: ManufacturerDto | any = {
        zohoId:  res.contacts[index]['contact_id'],
        website: res.contacts[index]['website'],
        companyName: res.contacts[index]['company_name'],
        // primaryCategories:'',
        primaryContactEmail:res.contacts[index]['email'],
        primaryContactName:res.contacts[index]['contact_name'],
        primaryContactMobile: res.contacts[index]['mobile'],
        businessType:res.contacts[index]['contact_type'],
        zohoContact: res.contacts[index]
      }
      console.log(contact);
      const createdData = await this.put(contact);
      if(createdData && !createdData.manufacturingPartnerId){
        await this.createPartnerId(createdData,MANUFACTURER_SOURCE.ZOHO_BOOKS);
      }
     
    }
    return res;
  }

  async createUnregister(manufacturer: UnregisterManufacturerDto,source?: MANUFACTURER_SOURCE): Promise<Manufacturer> {
    const createdManufacturer = await this._create({...manufacturer,isVerified: false, isActive: false});
    this.createUnRegisterUser(createdManufacturer);
    return createdManufacturer;
  }

  async createUnRegisterUser(manufacturer: Manufacturer){
    const userBody : any = {
      mobile: manufacturer.primaryContactMobile,
      email: manufacturer.primaryContactEmail,
      name: manufacturer.primaryContactName,
      type : 'manufacturer'
    };
    const user = await this.userService.create(userBody);
    const userManuMap: any = {
      userId: user.id,
      manufacturerId: manufacturer.id,
      workEmail: manufacturer.primaryContactEmail,
      workPhone: manufacturer.primaryContactMobile
    }
    await this.userManufactuereMapService.create(userManuMap);
  }

  async createRegisterUser(manufacturer: Manufacturer, registerManufacturer:RegisterManufacturerDto){
    const userBody : any = {
      mobile: registerManufacturer.mobile,
      name: registerManufacturer.name,
      type : 'manufacturer'
    };
    const user = await this.userService.create(userBody);
    const userManuMap: any = {
      userId: user.id,
      manufacturerId: manufacturer.id,
    }
    await this.userManufactuereMapService.create(userManuMap);
    // const userAddress:any = {
    //   city: registerManufacturer.city,
    //   state: registerManufacturer.state,
    //   gstin: registerManufacturer.gstin,
    //   isActive: true,
    //   isPrimary: true,
    //   manufacturerId: manufacturer.id
    // }
    // await this.addressAddress.create(userAddress);
  }

  async createRegister(manufacturer: RegisterManufacturerDto,source?: MANUFACTURER_SOURCE): Promise<Manufacturer> {
    const manufacturerData:   ManufacturerDto | RegisterManufacturerDto | any = {
      companyName: manufacturer.companyName,
      isVerified: false, 
      isActive: false,
      annualTurnover: manufacturer.annualTurnover,
      businessType: manufacturer.businessType,
      primaryCategories: manufacturer.primaryCategories
    }
    const createdManufacturer = await this._create(manufacturerData,source);
    const userAddress:any = {
      city: manufacturer.city,
      state: manufacturer.state,
      gstin: manufacturer.gstin,
      pinCode: manufacturer.pinCode,
      country: manufacturer.country,
      longitude: manufacturer.longitude,
      latitude: manufacturer.latitude,
      isActive: true,
      isPrimary: true,
      manufacturerId: createdManufacturer.id
    }
    const createdAddress =  await this.addressAddress.create(userAddress);
    this.createRegisterUser(createdManufacturer,manufacturer);
    return {... JSON.parse(JSON.stringify(createdManufacturer)), address: JSON.parse(JSON.stringify(createdAddress))};
  }

  getFilterQuery(filter: any) {
    let ilike = '';
    let manufacturerId;
    if (filter && filter.where && filter.where.and)
      for (let index = 0; index < filter.where.and.length; index++) {
        const element = filter.where.and[index];
        if (element.manufacturerId) {
          manufacturerId = element.manufacturerId;
        }
        if (element.sku) {
          ilike += element.sku.ilike;
        }
        if (element.or) {
          ilike += this.getOrFilterQuery(element.or);
        }
      }

    return { ilike, manufacturerId };
  }

  getOrFilterQuery(or: any[]) {
    let ilike = '';
    for (let index = 0; index < or.length; index++) {
      const element = or[index];
      if (element.sku) {
        ilike += element.sku.ilike;
      }
    }
    return ilike;
  }

  // async createPartnerId(manufacturerId: number) {
  //   const manufacturer = await this.queryService.executeQuery<any[]>(
  //     Query.getManufacturerInformations(manufacturerId),
  //   );
  //   if (manufacturer && manufacturer.length && 
  //     manufacturer[0]['addresses'] &&
  //     manufacturer[0]['addresses'].length &&
  //     manufacturer[0]['finances'] &&
  //     manufacturer[0]['finances'].length) {
  //       const productCategories = manufacturer[0]['primary_categories'] && manufacturer[0]['primary_categories'].length ? manufacturer[0]['primary_categories'][0] : '';
  //       const annualTurnover = manufacturer[0]['finances'] && manufacturer[0]['finances'].length && manufacturer[0]['finances'][0]['annual_turnover'] ? manufacturer[0]['finances'][0]['annual_turnover'] : '0';
  //       const state = manufacturer[0]['addresses'] && manufacturer[0]['addresses'].length && manufacturer[0]['addresses'][0]['state'] ? manufacturer[0]['addresses'][0]['state'] : '';
  //       const manufacturingPartnerId = `${this.getBusinessTypeCode(manufacturer[0]['business_type'])}${this.getPrimaryCategoryCode(productCategories)}${this.getRevenueCode(annualTurnover)}${this.getRegionCode(state)}${this.getIdCode(manufacturerId.toString())}`
  //       await this.updateById(manufacturerId, { manufacturingPartnerId })
  //   }
  //   if((manufacturer && manufacturer.length && 
  //     !manufacturer[0]['zoho_id'])){
  //       this.syncToZoho(manufacturerId);
  //     }
  // }

  async createPartnerId(manufacturer: Manufacturer,source:MANUFACTURER_SOURCE) {
   
    // if (manufacturer && manufacturer.state && manufacturer.annualTurnover) {
        const productCategories:any = manufacturer.primaryCategories ? manufacturer.primaryCategories : '';
        const state = manufacturer.state ? manufacturer.state : '';
        const sourceCode = source == MANUFACTURER_SOURCE.APP ? 'A' : 'B'
        const manufacturingPartnerId = `${this.getBusinessTypeCode(manufacturer.businessType)}${this.getPrimaryCategoryCode(productCategories[0])}${this.getRevenueCode(manufacturer.annualTurnover)}${this.getRegionCode(state)}${sourceCode}${this.getIdCode(manufacturer.id.toString())}`
        return this.updateById(manufacturer.id, { manufacturingPartnerId })
    // }
 
  }

  getRegionCode(state:string){
    if(['Delhi', 'Uttar Pradesh', 'Haryana', 'Punjab', 'Himachal Pradesh', 'Uttrakhand', 'Jammu & Kashmir', 'Madhya Pradesh'].includes(state)){
      return 'N';
    }else if(['Sikkim', 'Manipur', 'Medhalaya', 'Assam', 'Arunachal Pradesh', 'Nagaland', 'Mizoram'].includes(state)){
      return 'NE';
    }else if(['Tamil Nadu', 'Kerala', 'Karnataka', 'Goa'].includes(state)){
      return 'S';
    }else if(['Andra Pradesh', 'Telangana', 'Chattisgarh', 'Odisha'].includes(state)){
      return 'SE';
    }else if(['Maharasthra', 'Gujarat', 'Rajasthan'].includes(state)){
      return 'W';
    }else if(['West Bengal', 'Bihar', 'Jharkhand'].includes(state)){
      return 'E';
    }else{
      return '';
    }
  }

  // getRevenueCode(annualTurnover:string){
  //   const min = 5 * Math.pow(10 , 7);
  //   const max = 10 * Math.pow(10 , 2)
  //   const cost = parseFloat(annualTurnover);
  //   if(cost < min){
  //     return 1;
  //   }else if(cost > min && cost < max){
  //     return 2;
  //   }else if(cost > max){
  //     return 3;
  //   }else{
  //     return ;
  //   }
  // }
  getRevenueCode(annualTurnover:ANNUAL_TURNOVER){
    switch (annualTurnover) {
      case ANNUAL_TURNOVER.LESS_THAN_5CR:
        return 1;
      case ANNUAL_TURNOVER.BETWEEN_5CR_10CR:
          return 2;
      case ANNUAL_TURNOVER.GREATER_THAN_10CR:
      return 3;
      default:
        return 0;
    }
  }

  getPrimaryCategoryCode(primaryCategory: PRIMARY_CATEGORIES_TYPE){
    switch (primaryCategory) {
      case PRIMARY_CATEGORIES_TYPE.PACKAGING:
        return 'PK';
      case PRIMARY_CATEGORIES_TYPE['F&B_DISPOSABLES']:
        return 'FB';
      case PRIMARY_CATEGORIES_TYPE['UNIFORM_&_RIDING_GEARS']:
        return 'UR';
      default:
        return '';
    }
  }

  getBusinessTypeCode(businessType: BUSINESS_TYPE){
      switch (businessType) {
        case BUSINESS_TYPE.MANUFACTURER:
          return 'M';
        case BUSINESS_TYPE.IMPORTER:
          return 'I';
        case BUSINESS_TYPE.DISTRIBUTOR:
          return 'D';
        case BUSINESS_TYPE.VENDOR:
          return 'V'
        default:
          return 'O'
      }
  }

  getIdCode(id: string){
    switch (id.length) {
      case 1:
        return `0000${id}`;
      case 2:
        return `000${id}`;
      case 3:
        return `00${id}`;
      case 4:
        return `0${id}`;
      default:
        return `${id}`;
    }
  }

 async syncToZoho(manufacturerId:number, source?:MANUFACTURER_SOURCE){
    const manufacturer = await this.queryService.executeQuery<any[]>(
      Query.getManufacturerZohoZyncInfo(manufacturerId),
    );
    try {
    const zohoRes = await this.zohoService.request(ZOHO_API.MANUFACTURER_SYNC, {...manufacturer[0], contact_type : 'vendor'});
      await this.updateById(manufacturerId,{zohoId : zohoRes.contact.contact_id})
    } catch (error) {
      console.log("ERROR IS ZOHO SYNC :::", JSON.stringify(error));
      
    }
    // const authToken = await this.zohoService.generateAuthToken();
    // this.zohoService.syncManufacturer({...manufacturer[0], contact_type : 'vendor'},authToken)
  }


 
}
