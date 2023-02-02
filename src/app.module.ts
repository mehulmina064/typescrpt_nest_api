import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ApisModule } from './apis/apis.module';
import { CanCommonModule } from '@can/common';

@Module({
  imports: [CoreModule, ApisModule, CanCommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
