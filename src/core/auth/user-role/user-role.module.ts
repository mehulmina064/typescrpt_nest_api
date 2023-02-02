import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleRepository } from './user-role.repository';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [],
  controllers: [UserRoleController],
  providers: [UserRoleRepository, UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
