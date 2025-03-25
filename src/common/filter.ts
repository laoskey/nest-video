import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    // 检查异常类型
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      // 如果不是 HttpException，使用默认的 500 状态码
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    return response.status(status).json({
      status,
      sccess: false,
      data: message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
