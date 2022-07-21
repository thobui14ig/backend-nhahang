import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('/doanhthungay')
  getDoanhthungay(){
    return this.service.getDoanhthungay()
  }

  @Get('/doanhthuthang/:n')
  getDoanhthuthang(@Param() n: number){
    return this.service.getDoanhthuthang(n)
  }

  @Get('/doanhthutuan/:start/:end')
  getDoanhthutuan(@Param() param: number){
    return this.service.getDoanhthutuan(param)
  }

  @Get('/doanhthunam/:year')
  getDoanhthunam(@Param() param: number){
    return this.service.getDoanhthunam(param)
  }

}
