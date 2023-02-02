import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DEV_ENV, PROD_ENV, PRODUCTION } from '../constants/app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Access the config file globally
      isGlobal: true,
      // Set environment file based on Node Environment
      envFilePath: process.env.NODE_ENV == PRODUCTION ? PROD_ENV : DEV_ENV,
    }),
  ],
  exports: [ConfigModule],
})
export class CanConfigModule {}
