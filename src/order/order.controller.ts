import { OrderDetailsService } from './../orderDetails/orderDetails.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: OrderEntity,
  },
  query: {
    join: {
      ban: {},
      orderDetails: {},
      'orderDetails.sanpham':{}
    },
    
  },
})
@Controller('order')
@ApiTags('order')
export class OrderController implements CrudController<OrderEntity> {
  constructor(
    public service: OrderService,
    public orderDetailsService: OrderDetailsService,
    ) {}
  get base(): CrudController<OrderEntity> {
    return this;
  }
  @Post('/add')
  createOrder(@Body() request){
    return this.service.createOrder(request)
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    this.orderDetailsService.deleteOrderDetailsByIdban({ orderId: req.parsed.paramsFilter[0].value })
    return this.base.deleteOneBase(req);
  }
}
