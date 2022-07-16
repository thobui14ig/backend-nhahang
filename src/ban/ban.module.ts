import { BanService } from './ban.service';
import { BanController } from './ban.controller';
import { BanEntity } from './ban.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BanEntity])],
  controllers: [BanController],
  providers: [BanService],
  exports: [BanService],
})
export class BanModule {}
