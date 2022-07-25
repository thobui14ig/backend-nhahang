import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoantatController } from './hoantat.controller';
import { HoantatEntity } from './hoantat.entity';
import { HoantatService } from './hoantat.service';

@Module({
  imports: [TypeOrmModule.forFeature([HoantatEntity])],
  controllers: [HoantatController],
  providers: [HoantatService],
  exports: [HoantatService],
})
export class HoantatModule {}
