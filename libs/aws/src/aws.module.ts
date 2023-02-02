import { DynamicModule, Module } from '@nestjs/common';
import { CAN_AWS_CONFIG } from './aws.constant';
import { CanAwsService } from './aws.service';
import { CanAwsOptions } from './aws.type';

@Module({})
export class CanAwsModule {
  static forRoot(options: CanAwsOptions): DynamicModule {
    return {
      module: CanAwsModule,
      providers: [
        { provide: CAN_AWS_CONFIG, useValue: options ? options : {} },
        CanAwsService,
      ],
      exports: [CanAwsService],
    };
  }
}
