import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoantatController } from './hoanthanh.controller';
import { HoantatEntity } from './hoanthanh.entity';
import { HoantatService } from './hoanthanh.service';

@Module({
  imports: [TypeOrmModule.forFeature([HoantatEntity])],
  controllers: [HoantatController],
  providers: [HoantatService],
  exports: [HoantatService],
})
export class HoantatModule {}
