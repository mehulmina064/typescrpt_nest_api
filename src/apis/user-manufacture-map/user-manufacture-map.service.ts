import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { USERMANUFACTUREMAP_REPOSITORY } from './user-manufacture-map.repository';
import { UserManufactureMap } from './user-manufacture-map.model';
import { UserManufactureMapDto } from './user-manufacture-map.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class UserManufactureMapService {
  constructor(
    @Inject(USERMANUFACTUREMAP_REPOSITORY) private readonly userManufactureMapRepository: typeof UserManufactureMap
  ) {}

  async create(userManufactureMap: UserManufactureMapDto): Promise<UserManufactureMap> {
    if(userManufactureMap.userId && userManufactureMap.manufacturerId){
      const userManufactureMapData = await this.findOne({ where : { 
        userId : userManufactureMap.userId,
        manufacturerId : userManufactureMap.manufacturerId
      }})
      if(userManufactureMapData){
        throw new BadRequestException("User is already mapped with this manufactuere");
      }
    }
    return this.userManufactureMapRepository.create<UserManufactureMap>(userManufactureMap);
  }

  async findAll(filter: FindOptions) {
    return this.userManufactureMapRepository.findAll(filter);
  }

  async findOne(filter: FindOptions) {
    return this.userManufactureMapRepository.findOne(filter);
  }

  async findById(id: number): Promise<UserManufactureMap> {
    return this.userManufactureMapRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userManufactureMapRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.userManufactureMapRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.userManufactureMapRepository.upsert(data);
  }
}
