import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { HoantatEntity } from './hoanthanh.entity';
import { HoantatService } from './hoanthanh.service';

import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: HoantatEntity,
  },
  query: {
    // join: {
    //   order: {},
    //   'order.orderDetails':{}
    // },
    
  },
})
@Controller('hoantat')
@ApiTags('hoantat')
export class HoantatController implements CrudController<HoantatEntity> {
  constructor(public service: HoantatService) {}
  get base(): CrudController<HoantatEntity> {
    return this;
  }
}
