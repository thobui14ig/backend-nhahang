import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsController } from './orderDetails.controller';
import { OrderDetailsEntity } from './orderDetails.entity';
import { OrderDetailsService } from './orderDetails.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailsEntity])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
