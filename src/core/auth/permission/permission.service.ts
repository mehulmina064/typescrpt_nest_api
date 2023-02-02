import { Injectable, Inject } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from './permission.repository';
import { Permission } from './permission.model';
import { PermissionDto } from './permission.dto';
import { FindOptions, CountOptions } from 'sequelize';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: typeof Permission,
  ) {}

  async create(permission: PermissionDto): Promise<Permission> {
    return this.permissionRepository.create<Permission>(permission);
  }

  async findAll(filter: FindOptions) {
    return this.permissionRepository.findAll(filter);
  }

  async findById(id: number): Promise<Permission> {
    return this.permissionRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.permissionRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.permissionRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.permissionRepository.upsert(data);
  }
}
