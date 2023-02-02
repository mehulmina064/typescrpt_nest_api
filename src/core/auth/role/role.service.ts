import { Injectable, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from './role.repository';
import { Role } from './role.model';
import { RoleDto } from './role.dto';
import { FindOptions, CountOptions } from 'sequelize';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,
  ) {}

  async create(role: RoleDto): Promise<Role> {
    return this.roleRepository.create<Role>(role);
  }

  async findAll(filter: FindOptions) {
    return this.roleRepository.findAll(filter);
  }

  async findById(id: number): Promise<Role> {
    return this.roleRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.roleRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.roleRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.roleRepository.upsert(data);
  }
}
