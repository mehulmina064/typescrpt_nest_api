import { CanCommonModule } from 'libs/common/src';
import { DynamicModule, Module, Scope } from '@nestjs/common';
import { CAN_STATE_MACHINE_CONFIG } from './state-machine.constant';
import { CanStateMachineService } from './state-machine.service';
import { CanStateConfig } from './state-machine.type';

@Module({})
export class CanStateMachineModule {
  static forRoot(canStateConfig: CanStateConfig): DynamicModule {
    return {
      module: CanStateMachineModule,
      providers: [
        {
          provide: CAN_STATE_MACHINE_CONFIG,
          useValue: canStateConfig,
        },
        CanStateMachineService,
      ],
      imports: [CanCommonModule],
      exports: [CanStateMachineService],
    };
  }
}
