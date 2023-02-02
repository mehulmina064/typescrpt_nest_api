import { CanAwsModule } from '@can/aws';
import { forwardRef, HttpModule, HttpService, Module } from '@nestjs/common';
import { ProductsModule } from 'src/apis/products/products.module';
import { CommonModule } from 'src/common/common.module';
import { CanDatasourceModule } from 'src/core/datasource/datasource.module';
import { ApiService } from '../api/api.service';
import { CanRedisKeysService } from './redis-key.service';
import { CanRedisService } from './redis.service';

@Module({
  imports: [
    forwardRef(() => CommonModule),
    forwardRef(() => ProductsModule),
  ],
  providers: [ 
    CanRedisService,
    CanRedisKeysService
  ],
  exports: [ CanRedisService ,CanRedisKeysService],
})
export class RedisModule {}
