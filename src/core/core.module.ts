import { Module } from '@nestjs/common';
import { CanConfigModule } from '../core/config/config.module';
import { AuthModule } from './auth/auth.module';
import { CanDatasourceModule } from './datasource/datasource.module';
import { CanLoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CanConfigModule,
    CanLoggerModule,
    CanDatasourceModule,
    AuthModule,
    UserModule,
  ],
  exports: [
    CanConfigModule,
    CanLoggerModule,
    CanDatasourceModule,
    AuthModule,
    UserModule,
  ],
})
export class CoreModule {}
