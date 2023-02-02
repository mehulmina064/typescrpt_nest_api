import { Injectable, Inject } from '@nestjs/common';
import { ROLEPERMISSION_REPOSITORY } from './role-permission.repository';
import { RolePermission } from './role-permission.model';
import { RolePermissionsDto } from './role-permission.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import * as _ from 'lodash';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject(ROLEPERMISSION_REPOSITORY)
    private readonly rolePermissionsRepository: typeof RolePermission,
  ) {}

  async create(rolePermissions: RolePermissionsDto): Promise<RolePermission> {
    return this.rolePermissionsRepository.create<RolePermission>(
      rolePermissions,
    );
  }

  async findAll(filter: FindOptions) {
    return this.rolePermissionsRepository.findAll(filter);
  }

  async findById(id: number): Promise<RolePermission> {
    return this.rolePermissionsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.rolePermissionsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.rolePermissionsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.rolePermissionsRepository.upsert(data);
  }


  async mapping(rolePermissions: any): Promise<RolePermission[]> {
    const response = [];
    if(rolePermissions && 'permissionIds' in rolePermissions){
      for (let index = 0; index < rolePermissions.permissionIds.length; index++) {
        const mappedObj : any = {  
          permissionId : rolePermissions.permissionIds[index],
          roleId: rolePermissions.roleId
        }
        response.push(await this.rolePermissionsRepository.create<RolePermission>(
          mappedObj,
        ))
      }
    }
    return response;
  }

  async findUserRoles(filter: FindOptions) {
    const rolePermission = await this.findAll(filter)
    const permissionIds = []
    for (let index = 0; index < rolePermission.length; index++) {
      permissionIds.push(rolePermission[index].permissionId)      
    }

    return {permissionIds};
  }


  async updateMapping(id: number, data: object) {
    const rolePermission = await this.findAll({where :{ roleId : id}})
    const permissionIds = 'permissionIds' in data && _.isArray(data['permissionIds']) ? data['permissionIds'] :[]
    for (let index = 0; index < rolePermission.length; index++) {
       if(permissionIds.includes(rolePermission[index]['permissionId'])){
          permissionIds.splice(permissionIds.indexOf(rolePermission[index]['permissionId']),1)
       }else{
         await this.rolePermissionsRepository.destroy({where:{id : rolePermission[index]['id']}})
       } 
    }
    this.mapping({roleId : id, permissionIds})
    return {message : 'Update user role shortly'}
  }

}
