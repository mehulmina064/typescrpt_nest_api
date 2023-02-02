import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CanLoggerModule } from '../logger/logger.module';
import { UserRepository } from './user.repository';
import { CommonModule } from 'src/common/common.module';
import { SharedModule } from 'src/apis/shared/shared.module';
import { UserRoleModule } from '../auth/user-role/user-role.module';
import { CanCommonModule } from '@can/common';
import { AddressModule } from 'src/apis/address/address.module';

@Module({
  imports: [
    CanLoggerModule,
    CommonModule,
    CanCommonModule,
    SharedModule,
    UserRoleModule,
    AddressModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
