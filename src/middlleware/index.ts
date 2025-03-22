import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我来了');
    next();
  }
}
