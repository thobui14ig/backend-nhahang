import { DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import type {
  CallHandler,
  ExecutionContext,
  HttpServer,
  NestInterceptor,
} from '@nestjs/common';
import { Inject, Injectable, Optional } from '@nestjs/common';
import Redis from 'ioredis';
import type { Observable } from 'rxjs';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
const REFLECTOR = 'Reflector';

export interface HttpAdapterHost<T extends HttpServer = any> {
  httpAdapter: T;
}

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  @Optional()
  @Inject(HTTP_ADAPTER_HOST)
  protected readonly httpAdapterHost: HttpAdapterHost;

  protected allowedMethods = ['GET'];

  constructor(
    @Inject('CACHE_MANAGER') protected readonly cacheManager: any,
    @Inject(REFLECTOR) protected readonly reflector: any,
    @InjectRedis(DEFAULT_REDIS_NAMESPACE) private redis: Redis,
  ) {}

  CACHE_MANAGER = 'CACHE_MANAGER';

  CACHE_KEY_METADATA = 'cache_module:cache_key';

  CACHE_TTL_METADATA = 'cache_module:cache_ttl';

  isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

  isFunction = (val: any): boolean => typeof val === 'function';

  isNil = (val: any): val is null | undefined =>
    this.isUndefined(val) || val === null;

  wait(ms: any) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const ttlValueOrFactory =
      this.reflector.get(this.CACHE_TTL_METADATA, context.getHandler()) ?? null;

    if (!key) {
      return next.handle();
    }

    try {
      const value = await this.redis.get(key)
;

      if (!this.isNil(value)) {
        return of(value);
      }

      const ttl = this.isFunction(ttlValueOrFactory)
        ? await ttlValueOrFactory(context)
        : ttlValueOrFactory;

      if ((await this.redis.set(key + 'keymutex', 1, 'EX', 5, 'NX')) === 'OK') {
        return next.handle().pipe(
          catchError((err) => {
            void this.redis.del(key + 'keymutex');

            return throwError(err);
          }),
          tap(async (response) => {
            const args = this.isNil(ttl)
              ? { key, response }
              : { key, response, ttl };
            await this.redis.set(
              key,
              JSON.stringify(args.response),
              'EX',
              ttl ?? 5,
            );
            await this.redis.del(key + 'keymutex');
          }),
        );
      }

      await this.wait(500);

      return await this.intercept(context, next);
    } catch {
      return next.handle();
    }
  }

  protected trackBy(context: ExecutionContext): string | undefined {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && Boolean(httpAdapter.getRequestMethod);
    const cacheMetadata = this.reflector.get(
      this.CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }

    const request = context.getArgByIndex(0);

    if (!this.isRequestCacheable(context)) {
      return undefined;
    }

    return httpAdapter.getRequestUrl(request);
  }

  protected isRequestCacheable(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    return this.allowedMethods.includes(req.method);
  }
}