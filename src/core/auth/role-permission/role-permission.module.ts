import { Module } from '@nestjs/common';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionsRepository as RolePermissionRepository } from './role-permission.repository';
import { RolePermissionService } from './role-permission.service';

@Module({
  imports: [],
  controllers: [RolePermissionController],
  providers: [RolePermissionRepository, RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
