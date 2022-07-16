import { DanhmucEntity } from './danhmuc.entity';
import { Module } from '@nestjs/common';
import { DanhmucService } from './danhmuc.service';
import { DanhmucController } from './danhmuc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DanhmucEntity])],
  controllers: [DanhmucController],
  providers: [DanhmucService],
  exports: [DanhmucService],
})
export class DanhmucModule {}
