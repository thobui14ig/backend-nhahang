import { RedisCacheService } from './../../redis/redis.service';
import { Inject } from "@nestjs/common";
// import { RedisCacheService } from "modules/redis/rediscache.service";

type GetLockNameFunc = (target: any, ...args) => string;

/**
 * Wrap a method, starting with getting a lock, ending with unlocking
 * @param {string} name lock name
 * @param {number} [_retryInterval]  milliseconds, the interval to retry
 * @param {number} [_maxRetryTimes]  max times to retry
 */
export function RedisCache(lockName: string | GetLockNameFunc, timeLive) {
  const redis = Inject(RedisCacheService);

  return function (target, _key, descriptor) {
    redis(target, 'redisService');
    const originalMethod = descriptor.value;
    let name: string;

    descriptor.value = async function (...args) {
      if (typeof lockName === 'string') {
        name = lockName;
      } else if (typeof lockName === 'function') {
        name = lockName(this, ...args);
      }

      const dataCache = await this.redisService.get(name);

      if (dataCache) {
        return dataCache;
      }

      //set 1 key cos gia tri la 1 trong 5 giaay, NX: set key neu key chua ton tai và có transaction, ví du có 5 request
      //thì 1 request vào if và set cache, 4 request vào else, 4 request thực thi lại hàm này kiểm tra đã có cache sẽ return luôn
      if (await this.redisService.setNx(name, 5)) {
        const data = await originalMethod.apply(this, args);
        await this.redisService.set(name, data, timeLive);
        await this.redisService.delete(name);

        return data;
      }

      await this.redisService.wait(500);

      return descriptor.value.apply(this, args);
    };
  };
}