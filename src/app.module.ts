import { HoantatModule } from './hoanthanh/hoanthanh.module';
import { OrderDetailsModule } from './orderDetails/orderDetails.module';
import { OrderModule } from './order/order.module';
import { BanModule } from './ban/ban.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'app',
      entities: ["dist/**/*.entity{.ts,.js}"],
      
      "migrationsTableName": "custom_migration_table",
      "migrations": ["migration/*.js"],

      synchronize: true,
      logging:"all",
      autoLoadEntities: true,
    }),
    DanhmucModule,SanphamModule,
    BanModule,OrderModule,
    OrderDetailsModule, HoantatModule


  ],
})
export class AppModule {}
