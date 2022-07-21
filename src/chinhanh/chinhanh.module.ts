import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChinhanhController } from './chinhanh.controller';
import { ChinhanhEntity } from './chinhanh.entity';
import { ChinhanhService } from './chinhanh.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChinhanhEntity])],
  controllers: [ChinhanhController],
  providers: [ChinhanhService],
  exports: [ChinhanhService],
})
export class ChinhanhModule {}
