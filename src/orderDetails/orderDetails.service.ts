import { SanphamService } from './../sanpham/sanpham.service';
import { CreateOneDto } from './dto/create-one.dto';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderDetailsEntity } from './orderDetails.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderDetailsService extends TypeOrmCrudService<OrderDetailsEntity>{
  constructor(
    @InjectRepository(OrderDetailsEntity) repo,
    @InjectDataSource() readonly connection: DataSource,
    public sanphamService: SanphamService
    ) {
    super(repo);
  }

  async deleteOrderDetailsByIdban(request){
    return await this.repo.delete({
      orderId: request.orderId,
    });
  }


  async themMotSanPham(request: CreateOneDto){
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    const { orderId, sanphamId, soluong } = request;
    try {
        //giảm số lượng
        await this.sanphamService.subProduct(sanphamId, +soluong, queryRunner)
        //
        const orderDetails = await this.repo.findOne({
          where: {
            orderId: orderId,
            sanphamId: sanphamId
          }
        })
    
        if(orderDetails){
          orderDetails.soluong = Number(orderDetails.soluong) + +soluong;
          await queryRunner.manager.save(OrderDetailsEntity, orderDetails)
        }else{
          const newOrder = this.repo.create(request)
          await queryRunner.manager.save(OrderDetailsEntity, newOrder)
        }
    
        // commit transaction now:
        await queryRunner.commitTransaction()
    } catch (err) {
        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction()
    } finally {
        // you need to release query runner which is manually created:
        await queryRunner.release()
    }






  }
}
