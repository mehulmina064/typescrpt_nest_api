import { Injectable, Inject } from '@nestjs/common';
import { USERROLE_REPOSITORY } from './user-role.repository';
import { UserRole } from './user-role.model';
import { UserRoleDto } from './user-role.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import * as _ from 'lodash';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject(USERROLE_REPOSITORY)
    private readonly userRolesRepository: typeof UserRole,
  ) {}

  async create(userRoles: UserRoleDto): Promise<UserRole> {
    return this.userRolesRepository.create<UserRole>(userRoles);
  }

  async mapUserRole(userRoles: any): Promise<UserRole[]> {
    const createdUserRoles: UserRole[] = []
    if(userRoles && 'roleIds' in userRoles){
      for (let index = 0; index < userRoles.roleIds.length; index++) {
        const mapRole:any = {
          userId:userRoles.userId , 
          roleId : userRoles.roleIds[index]
        };
        createdUserRoles.push(await this.create(mapRole))        
      }
    }
    return createdUserRoles;
  }

  async findUserRoles(filter: FindOptions) {
    const userRoles = await this.findAll(filter)
    const roleIds = []
    for (let index = 0; index < userRoles.length; index++) {
      roleIds.push(userRoles[index].roleId)      
    }

    return {roleIds};
  }

  async updateMappedUserRole(id: number, data: object){
    const userRoles = await this.findAll({where :{ userId : id}})
    const roleIds = 'roleIds' in data && _.isArray(data['roleIds']) ? data['roleIds'] :[]
    for (let index = 0; index < userRoles.length; index++) {
       if(roleIds.includes(userRoles[index]['roleId'])){
          roleIds.splice(roleIds.indexOf(userRoles[index]['roleId']),1)
       }else{
         await this.userRolesRepository.destroy({where:{id : userRoles[index]['id']}})
       } 
    }
    this.mapUserRole({userId : id, roleIds})
    return {message : 'Update user role shortly'}
  }
  async findAll(filter: FindOptions) {
    return this.userRolesRepository.findAll(filter);
  }
  async findOne(filter: FindOptions) {
    return this.userRolesRepository.findOne(filter);
  }

  async findById(id: number): Promise<UserRole> {
    return this.userRolesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userRolesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.userRolesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.userRolesRepository.upsert(data);
  }
}
