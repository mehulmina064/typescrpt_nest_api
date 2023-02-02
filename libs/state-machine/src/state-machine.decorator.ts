import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CAN_STATE_MACHINE_CONFIG_NAME } from './state-machine.constant';
import { CanStateMachineInterceptor } from './state-machine.interceptor';

export function CanStateMachine(config: string) {
  return applyDecorators(
    SetMetadata(CAN_STATE_MACHINE_CONFIG_NAME, config),
    UseInterceptors(CanStateMachineInterceptor),
  );
}
