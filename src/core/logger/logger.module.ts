import { Module } from '@nestjs/common';
import { CanLogger } from './logger.service';

@Module({
  providers: [CanLogger],
  exports: [CanLogger],
})
export class CanLoggerModule {}
