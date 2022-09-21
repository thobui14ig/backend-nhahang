import { Injectable, NestInterceptor, ExecutionContext, CallHandler, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const ResponseMessageKey = 'ResponseMessageKey'


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
        map((data) => {
          if (req.method === 'POST') {

          }

          if (req.method === 'DELETE') {

          }

          if (req.method === 'UPDATE') {

          }
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          return data;
        })
      )
  }
}