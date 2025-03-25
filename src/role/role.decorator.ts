import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  applyDecorators,
} from '@nestjs/common';
import type { Request } from 'express';

export const Role = (...args: string[]) => SetMetadata('roles', args);

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log('----dd', data);
    return req.url;
  },
);
