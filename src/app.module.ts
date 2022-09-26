import { KhoModule } from './nhapkho/nhapkho.module';
import { ChinhanhModule } from './chinhanh/chinhanh.module';
import { HoantatModule } from './hoanthanh/hoanthanh.module';
import { OrderDetailsModule } from './orderDetails/orderDetails.module';
import { OrderModule } from './order/order.module';
import { BanModule } from './ban/ban.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingModule } from './tracking/tracking.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerMiddleware } from './libs/middleware/logger.middleware';


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
      // logging:"all",
      autoLoadEntities: true,
    }),
    RedisModule.forRoot({
      config: {
        port: 6379,
        host: 'localhost'
      }
    }),

    DanhmucModule,SanphamModule,
    BanModule,OrderModule,
    OrderDetailsModule, HoantatModule,
    ChinhanhModule, KhoModule, TrackingModule


  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'ban', method: RequestMethod.ALL });
//   }
// }

export class AppModule{}
