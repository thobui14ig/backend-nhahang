import { SanphamModule } from './../sanpham/sanpham.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KhoController } from './nhapkho.controller';
import { KhoEntity } from './nhapkho.entity';
import { KhoService } from './nhapkho.service';

@Module({
  imports: [TypeOrmModule.forFeature([KhoEntity]), SanphamModule],
  controllers: [KhoController],
  providers: [KhoService],
  exports: [KhoService],
})
export class KhoModule {}
