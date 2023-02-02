import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthHeaders = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return  request.headers|| request.headers;
  },
);
