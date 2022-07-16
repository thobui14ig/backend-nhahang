import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderDetailsEntity } from './orderDetails.entity';

@Injectable()
export class OrderDetailsService extends TypeOrmCrudService<OrderDetailsEntity>{
  constructor(@InjectRepository(OrderDetailsEntity) repo) {
    super(repo);
  }

  updateOrderDetail(request){
    console.log(request);
    
    return request
  }
}
