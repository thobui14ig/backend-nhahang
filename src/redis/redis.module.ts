import { RedisCacheService } from './redis.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  exports: [RedisCacheService],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}