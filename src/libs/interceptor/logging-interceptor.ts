import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { url, method, params, query, body } = req;
    const now = Date.now();
    const now1 = new Date().toISOString();
    req.startTime = now1;

    return next.handle().pipe(
      tap(() => {

          return console.log({
            id: req.id,
            statusCode,
            url,
            method,
            params,
            query,
            body,
            now: now1,
            end: new Date().toISOString(),
            after: Date.now() - now,
            ip: req?.ip,
            ips: req?.ips,
          });

        return '';
      }),
    );
  }
}
