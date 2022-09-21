import { DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import type Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis(DEFAULT_REDIS_NAMESPACE) private redis: Redis) {}

  async set(key, data, time) {
    await this.redis.set(key, JSON.stringify(data), 'EX', time);
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async setNx(key, second) {
    return (
      (await this.redis.set(key + 'keymutex', 1, 'EX', second, 'NX')) === 'OK'
    );
  }

  async delete(key: string) {
    return this.redis.del(key + 'keymutex');
  }

  wait(ms: any) {
    return new Promise((r) => setTimeout(r, ms));
  }
}