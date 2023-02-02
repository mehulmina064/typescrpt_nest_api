import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { CanConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';
import { CanLoggerModule } from '../logger/logger.module';
import { CommonModule } from 'src/common/common.module';
import { GoogleModule } from './google/google.module';
import { FacebookModule } from './facebook/facebook.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from 'src/core/auth/user-role/user-role.module';
import { RolePermissionModule } from 'src/core/auth/role-permission/role-permission.module';
import { SharedModule } from 'src/apis/shared/shared.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [CanConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    PermissionModule,
    CanConfigModule,
    CanLoggerModule,
    // GoogleModule,
    // FacebookModule,
    CommonModule,
    UserRoleModule,
    RolePermissionModule,
    SharedModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
