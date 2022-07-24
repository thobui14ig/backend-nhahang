import { Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BanEntity } from './ban.entity';
import { BanService } from './ban.service';

import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: BanEntity,
  },
  query: {
    join: {
      order: {},
      'order.orderDetails':{}
    },
    
  },
})
@Controller('ban')
@ApiTags('ban')
export class BanController implements CrudController<BanEntity> {
  constructor(public service: BanService) {}
}
