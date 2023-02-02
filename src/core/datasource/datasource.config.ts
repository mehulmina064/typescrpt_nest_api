import {
  ICanDatasourceConfig,
  ICanDatasourceConfigAttributes,
} from './datasource.config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { User } from '../user/user.model';
import { Role } from 'src/core/auth/role/role.model';
import { Permission } from 'src/core/auth/permission/permission.model';
import { UserRole } from '../auth/user-role/user-role.model';
import { RolePermission } from '../auth/role-permission/role-permission.model';
import { MODELS } from 'src/include.models';

@Injectable()
export class CanDataSourceConfig implements ICanDatasourceConfig {
  constructor(private configService: ConfigService) {}

  /**
   * Extract Database Configuration from Environment File
   */
  get dataSourceConfiguration(): ICanDatasourceConfigAttributes {
    return {
      dialect: this.configService.get('DB_DIALECT') as any,
      host: this.configService.get('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_NAME'),
      sync: { alter: this.configService.get('DB_SYNC_ALTER') == 'true' },
      // Temp(Because glob pattern not working with default serve only works with debugging)
      models: [User, Role, Permission, UserRole, RolePermission, ...MODELS],
      // models: [User, Role, Permission, UserRole, RolePermission],
      // Add All Models By Glob Pattern
      // models: [path.resolve('**/**/*.model.ts')],
      // modelMatch: (filename, member) => {
      //   return (
      //     filename
      //       .substring(0, filename.indexOf('.model'))
      //       .split('-')
      //       .join('') === member.toLowerCase()
      //   );
      // },
    };
  }
}
