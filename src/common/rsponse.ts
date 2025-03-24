import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Data<T> {
  data: T;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          // Ensure the type of data is properly defined to avoid 'any' type
          data: data as T,
          status: 0,
          message: 'success',
          success: true,
        };
      }),
    );
  }
}
