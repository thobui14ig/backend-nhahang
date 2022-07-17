import { Body, Controller, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { OrderDetailsEntity } from './orderDetails.entity';
import { OrderDetailsService } from './orderDetails.service';

import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: OrderDetailsEntity,
  },
  query: {
    join: {
      sanpham: {},
    },
    
  },
})
@Controller('orderDetails')
@ApiTags('orderDetails')
export class OrderDetailsController implements CrudController<OrderDetailsEntity> {
  constructor(public service: OrderDetailsService) {}

  @Post('/deleteOrder')
  deleteOrderDetailsByIdban(@Body() request){
    return this.service.deleteOrderDetailsByIdban(request)
  }
}
