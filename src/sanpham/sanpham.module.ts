import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanphamEntity } from './sanpham.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SanphamEntity])],
  controllers: [SanphamController],
  providers: [SanphamService],
  exports: [SanphamService],
})
export class SanphamModule {}
