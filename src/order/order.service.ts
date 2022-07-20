import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity>{
  constructor(@InjectRepository(OrderEntity) repo) {
    super(repo);
  }


  async createOrder(request){
    const { banId } = request;
    const dataOrder = await this.repo.findOneBy({banId:  banId});
    if(dataOrder){
      return dataOrder.id
    }else{
      const data = await this.repo.create({
        banId: banId
      })
      const dataReturn = await this.repo.save(data);
      
      return dataReturn.id
    }
    
   
  }




}
