import { CanAwsModule } from '@can/aws';
import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { OtpService } from './services/otp/otp.service';
import { QueryService } from './services/query/query.service';
import { CanDatasourceModule } from 'src/core/datasource/datasource.module';
import { ApiService } from '../../libs/common/src/services/api/api.service';
import { ExceptionService } from './services/exceptions/exception.service';
import { ZohoService } from './zoho/zoho.service';
import { RedisModule } from './services/redis/redis.module';
import { ProdoService } from './services/prodo/prodo.service';

@Module({
  imports: [
    CanAwsModule.forRoot({
      profile: process.env.AWS_PROFILE,
      region: process.env.AWS_REGION,
    }),
    HttpModule,
    CanDatasourceModule,
    RedisModule
  ],
  providers: [OtpService, QueryService,ApiService, ExceptionService,ZohoService,ProdoService],
  exports: [CanAwsModule, HttpModule, OtpService, QueryService, ApiService,ExceptionService,ZohoService,ProdoService],
})
export class CommonModule {}
