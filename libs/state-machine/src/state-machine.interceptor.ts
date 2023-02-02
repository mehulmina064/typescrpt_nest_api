import { CanContextService } from 'libs/common/src';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  CAN_STATE_MACHINE_CONFIG,
  CAN_STATE_MACHINE_CONFIG_NAME,
} from './state-machine.constant';
import { CanStateConfig } from './state-machine.type';

@Injectable({ scope: Scope.TRANSIENT })
export class CanStateMachineInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    // Before Execution
    const request: Request = context.switchToHttp().getRequest();
    if (
      request.method === 'POST' ||
      request.method === 'PUT' ||
      request.method === 'PATCH' ||
      request.method === 'DELETE'
    ) {
      const appContext = CanContextService.getAppContext();
      const reflector = appContext.get(Reflector);
      const configName = reflector.get(
        CAN_STATE_MACHINE_CONFIG_NAME,
        context.getHandler(),
      );
      const stateMachineConfig: CanStateConfig[] = appContext.get(
        CAN_STATE_MACHINE_CONFIG,
      );
      // After Execution
      const afterProcessed = await next.handle().toPromise();
      return afterProcessed;
    }
    return next.handle();
  }
}
